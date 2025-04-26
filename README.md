# Mesusers-Frontend

Projeto Frontend de consumo de usuários para execução

## Dependencias iniciais
- Baixe a versão mais recente do Node.js (https://nodejs.org/en)
- Baixe o Git em seu computador (https://git-scm.com/downloads)
- Em seguida clone o projeto em seu computador.
- Com um terminal, vá até o caminho da pasta e digite npm
```bash
  npm i
```
## Criar arquivo de enviroments
- Dentro da pasta src/app, crie uma pasta chamada enviroments
- Crie um arquivo com nome enviroment.ts
- Coloque o seguinte código
```
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080/api'
}
```
## Criar arquivo de enviroments

- Em seguida, após baixar todos os pacotes e colocar as configurações de enviroments
digite na pasta principal do projeto
```bash
  ng serve
```

# Pronto, servidor de pé 😉
