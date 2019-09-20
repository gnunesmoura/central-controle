# Estudo de rotina CI

Ferramentas utilizadas atualmente
1. Vagrant
2. Docker
3. Jenkins
4. SonarQube

Para realizar a rotina de CI eu estou utilizando a infraestrura descrita no repositório [vm-integracao-continua](https://github.com/gnunesmoura/vm-integracao-continua)

Apos inciar o Jenkins e o SonarQube como demonstrado no [README.MD](https://github.com/gnunesmoura/vm-integracao-continua/blob/master/README.md) crie um job de pipeline com o pipeline descrito abaixo:
```
pipeline {
    agent {
        docker {
            image 'node:10'
            args '-v /home/vagrant/sonar-scanner-4.0.0.1744-linux:/home/vagrant/sonar-scanner-4.0.0.1744-linux --link sonarqube:sonarqube'
        }
    }
    
    stages {
        stage('Clone do repositório') {
            steps {
                git 'https://github.com/gnunesmoura/central-controle.git'
            }
        }
        
        stage('Execução de testes automaticos') {
            steps {
                sh 'npm i'
                sh 'npm run test'
            }
        }
    
        stage('Realizar coleta de métricas') {
            steps {
                sh '/home/vagrant/sonar-scanner-4.0.0.1744-linux/bin/sonar-scanner   -Dsonar.projectKey=central-controle   -Dsonar.sources=.   -Dsonar.host.url=http://sonarqube:9000   -Dsonar.login=72ed6f2f3d81ee068198b1e5734d607bf441ec86'
            }
        }
    }
}
```