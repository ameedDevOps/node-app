pipeline {
    agent any

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'main', credentialsId: 'github_node01', url: 'https://github.com/ameedDevOps/node-app.git'
            }
        }
        stage('NPM Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('build') {
            steps {
              sh 'npm publish'
            }
        }
        stage('Run-Tests-Parellel') {
                    steps {
                        parallel(
                            "Smoke-Test": {
                                    echo 'Project is Testing'
                                    sleep 5
                                },
                            "Unit-Test": {
                                    echo 'Unit testing is in progress'
                                    sleep 5
                                },
                            "UI-Test": {
                                    echo 'UI testing is in progress'
                                    sleep 5
                                }
                            )
                        }                  
                    }
        stage('Deploying') {
        steps {
            parallel( 
                "first-job": {
                echo 'Deploying on Dev'
                sleep 5
                },
                "Second-Job": {
                echo 'Deploying on Dev'
                sleep 5
                }
            )
            }
        }
        stage('Deploy on Prod'){
            input {
                message "should we continue?"
            }
                steps {
                echo 'Deploying on Prod'
                sleep 5
            }
        }
    }
}
