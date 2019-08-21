Stack baseada nos serviços:
 - Elasticsearch
 - Kibana
 - Logstash
 
Serão adicionados os serviços [htppd](https://hub.docker.com/_/httpd) e [conductor](https://netflix.github.io/conductor/).
 
Central de controle exemplo escrita em Node.js. Todos os serviços são iniciados através de contêineres.

Antes de buildar o sistema realize:
1. Instalação do [docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) e [docker-compose](https://docs.docker.com/compose/install/#install-compose).
2. Verificação da configuração de memória para vm. [documentação](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html). 

Modifique a senha `senhaHomologacao` nos arquivos docker-compose.yml e esconfig/logstash.conf

Para buildar e iniciar o sistema
```
sudo docker-compose up -d
```

Para parar o sistema
```
sudo docker-compose stop
```
