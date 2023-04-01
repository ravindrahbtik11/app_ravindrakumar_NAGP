pipeline{
    agent any
    environment{
        scannerHome = tool 'sonar_scanner_dotnet'
        username='admin'
        appname='sonar-ravindrakumar'   
    }
    options {
        skipDefaultCheckout(true)
		timeout(time: 30, unit: 'MINUTES') 
        buildDiscarder(logRotator(numToKeepStr:'5', artifactNumToKeepStr: '5'))
    }
    stages{
		stage('Start') {
			steps {
				echo '**Starting code check out**'
				git branch: 'UserService', url: 'https://github.com/ravindrahbtik11/app_ravindrakumar_NAGP.git'
				echo '****Code check out Finished****'
			}
		}
		stage('Nuget restore'){
				steps{
						echo '**Start restoring packages**'
						bat "dotnet restore"
						echo '****Restore Nuget success****'
					}
			}
		// stage('Start sonarqube analysis') {
		// 		steps {
		// 			echo '**Start Sonar qube analysis**'
		// 				withSonarQubeEnv('Test_Sonar') {					
		// 					bat "dotnet ${scannerHome}\\SonarScanner.MSBuild.dll begin /k:\"sonar-ravindrakumar\""
		// 				}
		// 			echo '****Finished Sonar qube analysis****'
		// 		}
		// 	}

		stage('Code build'){
            steps {
                echo '**Build solution**'
                bat "dotnet build"
                echo '****Build success****'
            }
        }

        stage('Test case execution'){
            steps {         
				echo '**Test case execution**'
                bat "dotnet test"
                echo '****Test case execution****'	
            }
        }
        // stage('Stop sonarqube analysis') {
        //         steps {
        //         echo '**Stopping Sonar Qube analysis**'
        //           withSonarQubeEnv('Test_Sonar') {
        //                 bat "dotnet ${scannerHome}\\SonarScanner.MSBuild.dll end"
					   
        //             }
        //         echo '****Stopped Sonar Qube analysis****'
        //         }
        //     }        
        
		 stage('Kubernetes deployment'){
            steps {
					echo '**Image building section**'
					//  script{
					// 	  echo '**Start building Docker image**'
					// 		  dockerImage = docker.build("ravindrahbtik11/i-ravindrakumar-productservice:${BUILD_NUMBER}")
					// 		  echo '****Image built****'
					// 		  echo '**Start pushing Docker image**'
					// 		  docker.withRegistry( '', 'DockerDetail' ) {
					// 				 dockerImage.push()
					// 			}
					// 		  echo '****Image pushed****'					 
					// 	}	
					echo '****Done Image building and pushing into docker hub****'					
										
					// echo '**Creating Config Map**' 
                    // bat 'kubectl apply -f .\\configmap.yml'
					// echo '****Config Map created****' 
					// echo '**Creating Secret**' 
                    // bat 'kubectl apply -f .\\secret.yml'
					// echo '****Secret created****'
				    // echo '**Creating Deployment**' 
                    // bat 'kubectl apply -f .\\deployment.yml'
					// echo '****Deployment created****' 
					// echo '**Creating horizontal pod autoscaler**' 
                    // bat 'kubectl apply -f .\\horizontalpodautoscaler.yml'
					// echo '****horizontal pod autoscaler created****' 
                }
         }
		 stage('End'){
			 steps{
				echo '****Success****'				
			 }
		  		 
		 }       
    }    
}
