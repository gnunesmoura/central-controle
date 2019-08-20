Antes de buildar o sistema realize a instalação do docker e docker-compose.
Realize a configuração de memória para vm
Linux :
```
sysctl -w vm.max_map_count=262144
```

Modifique a senha `senhaHomologacao` nos arquivos docker-compose.yml e esconfig/logstash.conf

Para buildar e iniciar o sistema
```
docker-compose up -d
```

Para parar o sistema
```
docker-compose stop
```
