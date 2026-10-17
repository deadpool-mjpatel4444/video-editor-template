#!/bin/bash
# Lambda deployment script
# Requires AWS CLI configured

set -e

BUCKET=${1:-your-remotion-bucket}
REGION=${2:-us-east-1}

echo "Deploying Lambda function..."
npx remotion lambda deploy \
  --region $REGION \
  --bucket $BUCKET \
  --function-name remotion

echo "Deployment complete!"
echo "Configure environment variables:"
echo "  REMOTION_lambdaFunctionArn=arn:aws:lambda:$REGION:<account>:function:remotion"
echo "  AWS_REGION=$REGION"
echo "  REMOTION_BUCKET=$BUCKET"
