import pulumi
import pulumi_aws as aws
import json

class LambdaService:
    def __init__(self, 
                 name: str,
                 environment_vars: list[str] = None,
                 image_tag: str = None,
                 memory: int = 1024,
                 timeout: int = 30):
        
        self.name = name
        image_tag = image_tag or 'latest'

        # Create ECR Repository
        self.ecr_repository = aws.ecr.Repository(f"{name}-repository",
            name=name,
            force_delete=True,  # Allows deletion of the repository even if it contains images
            image_scanning_configuration={
                "scanOnPush": True  # Enable security scanning
            }
        )
        
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

        # Create Lambda function
        self.function = aws.lambda_.Function(f"{name}-lambda",
            role=self.role.arn,
            package_type="Image",
            image_uri=pulumi.Output.concat(
                self.ecr_repository.repository_url,
                ":",
                image_tag
            ),
            timeout=timeout,
            memory_size=memory,
            environment={
                "variables": environment_variables
            } if environment_variables else None
        )

        # Create API Gateway
        self.api = aws.apigateway.RestApi(f"{name}-api",
            name=f"{name}-api"
        )

        # Create catch-all proxy resource
        self.resource = aws.apigateway.Resource(f"{name}-api-resource",
            rest_api=self.api.id,
            parent_id=self.api.root_resource_id,
            path_part="{proxy+}"
        )

        # Setup ANY method
        self.method = aws.apigateway.Method(f"{name}-api-method",
            rest_api=self.api.id,
            resource_id=self.resource.id,
            http_method="ANY",
            authorization="NONE",
            request_parameters={
                "method.request.path.proxy": True
            }
        )

        # Setup integration
        self.integration = aws.apigateway.Integration(f"{name}-api-integration",
            rest_api=self.api.id,
            resource_id=self.resource.id,
            http_method=self.method.http_method,
            integration_http_method="POST",
            type="AWS_PROXY",
            uri=self.function.invoke_arn
        )

        # Deploy API
        self.deployment = aws.apigateway.Deployment(f"{name}-api-deployment",
            rest_api=self.api.id,
            opts=pulumi.ResourceOptions(depends_on=[self.integration])
        )

        self.stage = aws.apigateway.Stage(f"{name}-api-stage",
            rest_api=self.api.id,
            deployment=self.deployment.id,
            stage_name="prod"
        )

        # Allow API Gateway to invoke Lambda
        aws.lambda_.Permission(f"{name}-api-lambda-permission",
            action="lambda:InvokeFunction",
            function=self.function.name,
            principal="apigateway.amazonaws.com",
            source_arn=self.api.execution_arn.apply(lambda arn: f"{arn}/*/*")
        )

        # Export the URL
        self.url = self.stage.invoke_url

    def get_url(self) -> str:
        return self.url

    def get_ecr_repository_url(self) -> str:
        return self.ecr_repository.repository_url