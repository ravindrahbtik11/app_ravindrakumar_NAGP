pipeline{
    agent any
    environment{
        nodejs = tool 'NodeJs'
        username='admin'
        appname='sonar-ravindrakumar'   
    }
    options {
        skipDefaultCheckout(true)
		timeout(time: 30, unit: 'MINUTES') 
        buildDiscarder(logRotator(numToKeepStr:'5', artifactNumToKeepStr: '5'))
    }
    stages{
		stage('Start and Checkout') {
			steps {
				echo '**Starting code check out**'
				git branch: 'main', url: 'https://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@github.com/ravindrahbtik11/eCommerce-Web.git'
				echo '****Code check out Finished****'
			}
		}
		stage('NPM Istall'){
				steps{
                    echo '**Start NPM install**'
                     // bat 'npm install --legacy-peer-deps'
                     echo '**NPM installation complete**'
                }
			}
        // stage('Code analyze'){
        //     steps {         
		// 		echo '**Test case execution**'
        //         bat 'npm lint'
        //         echo '****Test case execution****'	
        //     }
        // }
		// stage('Code build'){
        //     steps {
        //         echo '**Build project**'
        //         bat "npm run build"
        //         echo '****Build success****'
        //     }
        // }

         stage('Code build and Creation of Docker Image'){
            steps {
					echo '**Image building section**'
					 script{
						  echo '**Start building Docker image**'
							  dockerImage = docker.build("ravindrahbtik11/i-ravindrakumar-web:${BUILD_NUMBER}")
							  echo '****Image built****'
							  echo '**Start pushing Docker image**'
							  docker.withRegistry( '', 'DockerDetail' ) {
									 dockerImage.push('latest')
								}
							  echo '****Image pushed****'					 
						}	
					echo '****Done Image building and pushing into docker hub****'					
						
                }
         }

		 stage('End'){
			 steps{
				echo '****Success****'				
			 }
		 }       
    }    
}