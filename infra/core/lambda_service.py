import pulumi
import pulumi_aws as aws
import json
import boto3

class LambdaService:
    def __init__(self, 
                 name: str,
                 environment_vars: list[str] = None,
                 image_tag: str = None,
                 memory: int = 1024,
                 timeout: int = 30):
        
        self.name = name

        # Create ECR Repository
        self.ecr_repository = aws.ecr.Repository(f"{name}-repository",
            name=name,
            force_delete=True,
            image_scanning_configuration={
                "scanOnPush": True
            }
        )

        def get_latest_version_tag():
            """Get latest version tag from ECR"""
            client = boto3.client('ecr')
            try:
                response = client.describe_images(
                    repositoryName=name,
                    filter={'tagStatus': 'TAGGED'}
                )
                if not response.get('imageDetails'):
                    return 'latest'

                sorted_images = sorted(
                    response['imageDetails'],
                    key=lambda x: x['imagePushedAt'],
                    reverse=True
                )

                for image in sorted_images:
                    for tag in image.get('imageTags', []):
                        return tag
                return 'latest'
            except Exception as e:
                print(f"Error getting latest version tag: {e}")
                return 'latest'

        # Get environment variables from SSM
        environment_variables = {}
        if environment_vars:
            for env_var in environment_vars:
                param_value = aws.ssm.get_parameter(
                    name=f"/{name}/{env_var.lower()}",
                    with_decryption=True
                ).value
                environment_variables[env_var] = param_value

        # Create Lambda role
        self.role = aws.iam.Role(f"{name}-lambda-role",
            assume_role_policy=json.dumps({
                "Version": "2012-10-17",
                "Statement": [{
                    "Action": "sts:AssumeRole",
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "lambda.amazonaws.com"
                    }
                }]
            })
        )

        # Add basic Lambda execution role
        aws.iam.RolePolicyAttachment(f"{name}-lambda-basic-execution",
            role=self.role.name,
            policy_arn="arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        )

        # Add SSM read permissions if needed
        if environment_vars:
            aws.iam.RolePolicyAttachment(f"{name}-lambda-ssm-policy",
                role=self.role.name,
                policy_arn="arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
            )

        def create_function(args):
            repository_url = args['repository_url']
            try:
                client = boto3.client('ecr')
                # First check if repository exists and has images
                response = client.describe_images(
                    repositoryName=name,
                    filter={'tagStatus': 'TAGGED'}
                )
                
                # If no images exist, return None
                if not response.get('imageDetails'):
                    pulumi.log.info(
                        f"No tagged images found in ECR repository for {name}. Push images to its URI: {repository_url}")
                    return None

                latest_tag = get_latest_version_tag()
                return aws.lambda_.Function(f"{name}-lambda",
                    role=self.role.arn,
                    package_type="Image",
                    image_uri=f"{repository_url}:{latest_tag}",
                    timeout=timeout,
                    memory_size=memory,
                    environment={
                        "variables": environment_variables
                    } if environment_variables else None,
                    opts=pulumi.ResourceOptions(
                        depends_on=[self.ecr_repository]
                    )
                )
            except client.exceptions.RepositoryNotFoundException:
                pulumi.log.info(
                    f"Repository not found for {name}. Push images to its URI: {repository_url}")
                return None
            except Exception as e:
                pulumi.log.error(f"Error creating Lambda function: {e}")
                return None

        # Create Lambda function with dynamic image check
        self.function = self.ecr_repository.repository_url.apply(
            lambda url: create_function({"repository_url": url})
        )

        # Only create API Gateway if Lambda function exists
        def create_api_gateway(function):
            if function is None:
                pulumi.log.info(f"Skipping API Gateway creation as Lambda function does not exist yet for {name}")
                return None
            
            # Create API Gateway
            api = aws.apigateway.RestApi(f"{name}-api",
                name=f"{name}-api"
            )

            # Create catch-all proxy resource
            resource = aws.apigateway.Resource(f"{name}-api-resource",
                rest_api=api.id,
                parent_id=api.root_resource_id,
                path_part="{proxy+}"
            )

            # Setup ANY method
            method = aws.apigateway.Method(f"{name}-api-method",
                rest_api=api.id,
                resource_id=resource.id,
                http_method="ANY",
                authorization="NONE",
                request_parameters={
                    "method.request.path.proxy": True
                }
            )

            # Setup integration
            integration = aws.apigateway.Integration(f"{name}-api-integration",
                rest_api=api.id,
                resource_id=resource.id,
                http_method=method.http_method,
                integration_http_method="POST",
                type="AWS_PROXY",
                uri=function.invoke_arn
            )

            # Deploy API
            deployment = aws.apigateway.Deployment(f"{name}-api-deployment",
                rest_api=api.id,
                opts=pulumi.ResourceOptions(depends_on=[integration])
            )

            stage = aws.apigateway.Stage(f"{name}-api-stage",
                rest_api=api.id,
                deployment=deployment.id,
                stage_name="prod"
            )

            # Allow API Gateway to invoke Lambda
            aws.lambda_.Permission(f"{name}-api-lambda-permission",
                action="lambda:InvokeFunction",
                function=function.name,
                principal="apigateway.amazonaws.com",
                source_arn=api.execution_arn.apply(lambda arn: f"{arn}/*/*")
            )

            return stage.invoke_url

        # Create API Gateway conditionally
        self.url = self.function.apply(create_api_gateway)

    def get_url(self) -> str:
        return self.url if self.url else ""

    def get_ecr_repository_url(self) -> str:
        return self.ecr_repository.repository_url