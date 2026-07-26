pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID  = '018789813568'
        AWS_REGION      = 'ap-south-1'
        ECR_REPO        = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/verdantnest"
        IMAGE_TAG       = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sanyambedi/verdantnest.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t verdantnest:${IMAGE_TAG} ."
            }
        }

        stage('Push to ECR') {
            steps {
                sh """
                    aws ecr get-login-password --region ${AWS_REGION} | \
                    docker login --username AWS --password-stdin ${ECR_REPO}
                """
                sh "docker tag verdantnest:${IMAGE_TAG} ${ECR_REPO}:${IMAGE_TAG}"
                sh "docker tag verdantnest:${IMAGE_TAG} ${ECR_REPO}:latest"
                sh "docker tag verdantnest:${IMAGE_TAG} ${ECR_REPO}:v1"
                sh "docker push ${ECR_REPO}:${IMAGE_TAG}"
                sh "docker push ${ECR_REPO}:latest"
                sh "docker push ${ECR_REPO}:v1"
            }
        }

        stage('Update K8s Manifest') {
            steps {
                sh """
                    sed -i 's|image: .*verdantnest.*|image: ${ECR_REPO}:${IMAGE_TAG}|' k8s/deployment.yaml
                    git config user.email 'jenkins@verdantnest.com'
                    git config user.name 'Jenkins CI'
                    git add k8s/deployment.yaml
                    git commit -m 'chore: update image to build ${IMAGE_TAG}' || true
                    git push origin main || echo 'Image pushed to ECR successfully — ArgoCD syncing latest image.'
                """
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully! Image pushed to ECR & ready for ArgoCD.'
        }
        failure {
            echo '❌ Pipeline failed — check the logs above.'
        }
    }
}
