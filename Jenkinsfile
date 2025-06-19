pipeline {
   
   //The agent section specifies where the entire Pipeline, or a specific stage, 
   //will execute in the Jenkins environment depending on where the agent section is placed.
   agent any

    //NoAnsi Color Plugin helps to avoid weird Jenkins console output and displays the console output in color format
    options {
        ansiColor('xterm')
    }
   
   tools {
       nodejs "Node 20.5.0"
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
            choices: ['electron', 'chrome', 'edge', 'firefox'], 
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



    //The stage directive goes in the stages section and should contain a steps section, an optional agent section, 
    //or other stage-specific directives. Practically speaking, all of the real work done by a Pipeline will be wrapped in one or more stage directives.
   stages {
        
       stage('checked out code and Installing dependencies') {
           steps {
               bat 'npm i'
               echo 'dependencies installed'
           }
       }
       
       stage('Clearing old reports') {
           steps {
               bat "npm run report:pre"
           }
       }
       
       stage('Running cypress e2e Tests') {
            //For recording tests on Cypress Cloud Dashboard, you need to set these environment variables
                steps {
                    bat  'npx cypress run --env grepTags=@regression'
        }
        }
        
        //Mocha JUnit Reporter produces separate XML for each spec result, so we merge the test results into one XML file 
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
            
            script {
               
                echo 'Publishing JUnit XML Results'
                def testResults = junit testResults: 'cypress/results/junit/combined-report.xml'
                
                //Mapping build status to slack notification colors
                def COLOR_MAP = [
                    'SUCCESS'   : '#4CAF50',   //Green
                    'FAILURE'   : '#F44336',   //Red
                    'UNSTABLE'  : '#FFC107',   //Yellow
                    'ABORTED'   : '#9E9E9E',   //Grey
                    'NOT_BUILT' : '#2196F3',   //Blue
                    'UNKNOWN'   : '#CCCCCC'    //Light Gray
                ]
                
                echo 'Sending email'     
            }
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