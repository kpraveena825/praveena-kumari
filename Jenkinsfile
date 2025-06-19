pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run'
            }
        }

         stage('Merging JUnit reports') {
           steps {
               bat "npm run report:post"
           }
       }
    }
}
