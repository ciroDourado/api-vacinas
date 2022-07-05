# API de Vacinas

## Índice

1. Instalação
2. Sobre o projeto
3. Problemas comuns

## Instalação

1. Instale todas as dependências com o comando:
```
npm ci
```
2. Configure a conexão com o banco de dados na seguinte forma
  1. copie todo o conteúdo do arquivo .env.example para .env
  2. preencha todos os campos necessários corretamente
  3. se atente em dar um usuário com permissões de criar tabelas 
```
cp .env.example .env
code .
```
3. Execute as migrações com:
```
npx prisma migrate dev
```
4. Teste a aplicação fazendo:
```
node server.js
```
