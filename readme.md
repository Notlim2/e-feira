## E-feira

Desafio técnico proposto:

 - Desenvolver um app, tipo e-commerce, utilizando React.js, para vender maçã, pêra, banana, abacaxi e manga.
	 - O cliente deve realizar o login (pode ser fixo)
	 -  O cliente poderá pesquisar pelo produto e escolher aquele que quer comprar
	-  Deve existir um carrinho de compras onde será listado os produtos que o cliente selecionou
	- Deve possuir um botão checkout (gerar um pdf como se fosse um comprovante)
<hr />

## Tecnologias utilizadas
### Backend
NodeJS, Express, JavaScript, Sequelize, SQLite como banco de dados.

### Frontend
ReactJS com typescript, axios, context API, styled components, React PDF, entre outras.

## Como utilizar

### Backend
Abrir a pasta /backend com o prompt ou shell, executar o comando `npm install / yarn install`. Então rodar o comando `npx sequelize db:migrate` para executar as migrações, e posteriormente o comando `npx sequelize db:seed:all` para executar as seeds de produtos e usuários. Após esse procedimento pasta executar o comando `npm start` / `yarn start` para iniciar a aplicação.

### Frontend
Abrir a pasta /frontend com o prompt ou shell, executar o comando `npm install` / `yarn install`, e então rodar o comando `npm start` / `yarn start`