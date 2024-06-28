pipeline {
    agent any
    
    environment {
        
        RENDER_API_TOKEN = credentials('Render')
        
        RENDER_APP_NAME = 'Week2IP1'

        EMAIL_RECIPIENT = 'faithkym7@gmail.com'
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

        stage('install mocha and chai'){
            steps{
                echo 'other dependencies...'
                sh 'npm install --save-dev mocha chai chai-http'
            }
        }
        stage('Test project'){
            steps{
                echo 'Testing...'
                sh 'npm test'
            }
        }

        stage('Build project') {
            steps {
                echo 'Building...'
                sh 'npm run build'
            }
        }
        
        stage('start server'){
            steps{
                echo 'starting server...'
                sh 'npm start &'
                sleep 10 //time for the server to start

                //check for UI
                sh 'curl -s http://localhost:5000/'
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
        always{
            script{
                //server stop
                sh 'npm stop'

                if(currentBuild.result == 'FAILURE'){
                   emailext (
                        to: "${EMAIL_RECIPIENT}",
                        subject: "Jenkins Build Failed: ${env.JOB_NAME} ${env.BUILD_NUMBER}",
                        body: """
                        <p>The Jenkins build <b>${env.JOB_NAME} ${env.BUILD_NUMBER}</b> has failed.</p>
                        <p>Please check the Jenkins console output for more details: ${env.BUILD_URL}</p>
                        """
                    ) 
                }
            }
        }
    }
}
