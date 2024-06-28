pipeline {
    agent any
    
    environment {
        
        RENDER_API_TOKEN = credentials('Render')
        
        RENDER_APP_NAME = 'Week2IP1'
    }
    
    tools {
        nodejs 'node-12'
    }
    
    stages {
        stage('Clone repository') {
            steps {
                echo 'Cloning repository...'
                git 'https://github.com/Faithkym7/Week2IP1.git'
            }
        }
        
        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Build project') {
            steps {
                echo 'Building...'
                sh 'npm run build'
            }
        }
        
        stage('Test project'){
            steps{
                echo 'Testing...'
                sh 'npm test'
            }
        }
        
        stage('Deploy to Render') {
            steps {
                echo 'Deploying to Render...'
                script {
                    // Use curl to trigger a deployment to Render
                    sh "curl -X POST -H 'Authorization: Bearer ${RENDER_API_TOKEN}' \
                        -H 'Content-Type: application/json' \
                        -d '{\"branch\": \"master\", \"env\": {\"NODE_ENV\": \"production\"}}' \
                        https://api.render.com/v1/service/${RENDER_APP_NAME}/deploy"
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment to Render succeeded!'
        }
        failure {
            echo 'Deployment to Render failed!'
        }
    }
}
