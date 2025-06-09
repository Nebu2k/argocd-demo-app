#!/bin/bash

# Build and Push Script for ArgoCD Demo App
set -e

# Configuration
DOCKER_USERNAME="speters"  # Ersetzen Sie mit Ihrem Docker Hub Username
IMAGE_NAME="argocd-demo-app"
VERSION=${1:-"v1.0.0"}

echo "🐳 Building Docker image: $DOCKER_USERNAME/$IMAGE_NAME:$VERSION"

# Build the image
docker build -t $DOCKER_USERNAME/$IMAGE_NAME:$VERSION .
docker tag $DOCKER_USERNAME/$IMAGE_NAME:$VERSION $DOCKER_USERNAME/$IMAGE_NAME:latest

echo "📤 Pushing to Docker Hub..."

# Push to Docker Hub
docker push $DOCKER_USERNAME/$IMAGE_NAME:$VERSION
docker push $DOCKER_USERNAME/$IMAGE_NAME:latest

echo "✅ Image pushed successfully!"
echo "📋 To update Kubernetes deployment, run:"
echo "   sed -i 's|image: $DOCKER_USERNAME/$IMAGE_NAME:.*|image: $DOCKER_USERNAME/$IMAGE_NAME:$VERSION|' k8s/deployment.yaml"
echo "   git add . && git commit -m 'Update to $VERSION' && git push"
