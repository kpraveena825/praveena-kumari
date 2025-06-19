pipeline {
   
   //The agent section specifies where the entire Pipeline, or a specific stage, 
   //will execute in the Jenkins environment depending on where the agent section is placed.
   agent any

    //NoAnsi Color Plugin helps to avoid weird Jenkins console output and displays the console output in color format
    options {
        ansiColor('xterm')
    }
   
   tools {
       nodejs "Node"
   }
   

   //The parameters directive provides a list of parameters that a user should provide when triggering the Pipeline.
   //The values for these user-specified parameters are made available to Pipeline steps via the params object
   parameters {
        choice(
            name: 'TEST_ENVIRONMENT', 
            choices: [
                'local',
                'prod',
            ], 
            description: 'Specify the test environment. Default will be local.'
        )
        choice(
            name: 'BROWSER', 
            choices: ['chrome', 'edge', 'firefox'], 
            description: 'Pick the web browser you want to use to run your scripts. Default will be electron.'
        )

        choice(
            name: 'TAG', 
            choices: [
                '@regression', 
                '@smoke', 
                '@Login', 
                '@envelope', 
                '@transaction', 
            ], 
            description: 'Choose the test tag to filter your test scripts'
        )
    }

   stages {
        
       stage('checked out code and Installing dependencies') {
           steps {
               bat 'npm i'
               echo 'dependencies installed'
           }
       }
       
       stage('Running cypress e2e Tests') {
                steps {
                    script {
                     echo "running scrips with Browser: ${params.BROWSER}, TAG: ${params.TAG}, Environment: ${params.TEST_ENVIRONMENT} "
                    //bat  'npx cypress run --env grepTags=@regression'
                     bat "npx cypress run --browser ${params.BROWSER} --env environmentName=${params.TEST_ENVIRONMENT},grepTags=${params.TAG}"
                    }
                }
        }
        
       stage('Merging JUnit reports') {
           steps {
               bat "npm run report:post"
           }
       }

   }
   
   post {
        always {
            //Publish the HTML report using the HTML Publisher plugin
            echo 'Publishing the Extent Report'
            publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'cypress/results/cypress-mochawesome-reporter',
                    reportFiles: 'index.html',
                    reportName: 'Cypress Mochawesome Report',
                    reportTitles: 'Cypress Test Automation Framework',
                    useWrapperFileDirectly: true
            ])
        }
        
        success {
            echo 'Build Successful'
        }

        failure {
            echo 'Build Failed'
        }

        unstable {
            echo 'Build unstable'
        }
    }
}