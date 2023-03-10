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
				git branch: 'main', url: 'https://github.com/ravindrahbtik11/app_ravindrakumar_NAGP.git'
				echo '****Code check out Finished*****'
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
							  dockerImage = docker.build("ravindrahbtik11/i-ravindrakumar-main:latest")
							  echo '****Image built****'
							  echo '**Start pushing Docker image**'
							  docker.withRegistry( '', 'DockerDetail' ) {
									 dockerImage.push('latest')
								}
							  echo '****Image pushed****'					 
						}	
						 echo '****Done Image building and pushing into docker hub****'	
						 echo '**creating deployment**' 
						 bat 'kubectl apply -f .\\deployment.yml'
						 echo '****deployment created****' 
						 echo '**creating horizontal pod autoscaler**' 
						 bat 'kubectl apply -f .\\horizontalpodautoscaler.yml'
						 echo '****horizontal pod autoscaler created****' 					
						
                }
         }

		 stage('End'){
			 steps{
				echo '****Success****'				
			 }
		 }       
    }    
}