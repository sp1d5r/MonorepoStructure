import os
import pulumi
from core.lambda_service import LambdaService

# Create a Lambda service with environment variables
service = LambdaService(
    name="monorepo-example",
    environment_vars=[
        "NOTION_API_KEY",
        "NOTION_DATABASE_ID",
        "STRIPE_API_KEY",
        "FIREBASE_PROJECT_ID",
        "FIREBASE_CLIENT_EMAIL",
        "FIREBASE_PRIVATE_KEY",
    ],
    image_tag=os.getenv('IMAGE_TAG', 'latest')
)

# Export the URLs
pulumi.export("api_url", service.get_url())
pulumi.export("ecr_repository_url", service.get_ecr_repository_url())