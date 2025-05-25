pipeline {
  agent any
  environment {
    REGISTRY   = 'docker.io/habibaharoon'
    IMAGE      = "${REGISTRY}/node-hello"
    TAG        = "build-${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout')   { steps { checkout scm } }

    stage('Install')    { steps { sh 'npm install --no-audit --no-fund' } }

    stage('Lint')       { steps { sh 'npm run lint' } }

    stage('Unit Test')  { steps { sh 'npm test' } }

    stage('Build Image & Push') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'docker-hub') {
            def img = docker.build("${IMAGE}:${TAG}")
            img.push()
            img.push('latest')
          }
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(credentials: ['ec2-ssh']) {
          sh """
            ssh -o StrictHostKeyChecking=no ubuntu@3.90.218.57 '
              docker pull ${IMAGE}:${TAG} &&
              docker compose -f docker-compose.yml down || true &&
              docker compose -f docker-compose.yml up -d'
          """
        }
      }
    }

    stage('Selenium E2E') {
      steps {
        withEnv(["APP_IMAGE=${IMAGE}:${TAG}"]) {
          sh 'docker compose -f docker-compose.e2e.yml up --abort-on-container-exit --exit-code-from tester'
        }
      }
    }
  }
}
