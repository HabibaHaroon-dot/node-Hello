pipeline {
  agent any

  stages {
    stage('Build & Deploy') {
      steps {
        // Build the image named "hello"
        sh 'docker build -t hello .'

        // Stop & remove any existing container named hello-app
        sh '''
          if [ "$(docker ps -q -f name=hello-app)" ]; then
            docker rm -f hello-app
          fi
        '''

        // Run the new "hello" image as a container named hello-app
        sh 'docker run -d --name node-hello -p 9000:8000 hello'
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}
