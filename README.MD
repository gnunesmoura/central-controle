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
