# central-controle

Microserviço web baseado em [GraphQL](https://graphql.org/) para [recebimento de informação e controle de nós sensores sem 
fio via https](https://github.com/gnunesmoura/controlador-esp8266-https).

Pré-requisitos:
1. [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/);
2. [docker-compose](https://docs.docker.com/compose/install/#install-compose).

Para entender como funciona a configuração do app veja o arquivo 
[env-config.js](https://github.com/gnunesmoura/central-controle/blob/master/src/env-config.js)

## Deploy local
1. Faça o build da imagem
```
sudo docker-compose build
```

2. Inicie o microserviço
```
sudo docker-compose up --detach
```

Para parar o microserviço
```
sudo docker-compose stop
```

## Integração Continua Jenkins & SonarQube.

Para realizar a rotina de CI eu estou utilizando a maquina virtual descrita no repositório [vm-integracao-continua](https://github.com/gnunesmoura/vm-integracao-continua)

Apos inciar o Jenkins e o SonarQube como demonstrado no [README.MD](https://github.com/gnunesmoura/vm-integracao-continua/blob/master/README.md) crie um job pipeline com o pipeline descrito abaixo:
```
pipeline {
    agent {
        docker {
            image 'node:10'
            args '-v /home/vagrant/sonar-scanner-4.0.0.1744-linux:/home/vagrant/sonar-scanner --link sonarqube:sonarqube'
        }
    }
    
    parameters { string(name: 'SONAR_TOKEN', defaultValue: 'token', description: '') }
    parameters { string(name: 'PROJECT_KEY', defaultValue: 'projectKey', description: '') }

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
                sh '/home/vagrant/sonar-scanner/bin/sonar-scanner   -Dsonar.projectKey="${PROJECT_KEY}"   -Dsonar.sources=.   -Dsonar.host.url=http://sonarqube:9000   -Dsonar.login="${SONAR_TOKEN}"'
            }
        }
    }
}```