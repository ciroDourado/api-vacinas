const cors    = require("cors")
const express = require("express")

// variáveis de ambiente
const env = process.env

// módulos para serem acoplados na aplicação
var url_encoded_parser = express.urlencoded({extended: true})
var json_parser        = express.json()
var cors_module        = cors()

// clients
const app = express()

// acoplação de módulos na aplicação
app.use(cors_module)
app.use(json_parser)
app.use(url_encoded_parser)

// rotas
require("./routes/home.js")(app)
require("./routes/doses/routes.js")(app)
// require("./routes/enderecos/routes.js")(app)
require("./routes/vacinados/routes.js")(app)
require("./routes/vacinas/routes.js")(app)
require("./routes/doses_das_vacinas/routes.js")(app)
// require("./routes/validacao/routes.js")(app)

let servidor = app.listen(env.APPLICATION_PORT)

console.log(`Servindo na porta ${env.APPLICATION_PORT}`)
console.log(`Acesse em: ${env.APPLICATION_URL}:${env.APPLICATION_PORT}`)
console.log(`Aperte CTRL+C para finalizar\n`)

process.on('SIGTERM', finalizar);
process.on('SIGINT' , finalizar);

function finalizar() {
  servidor.close(() => {
    console.log('Servidor finalizado com sucesso');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Conexões não fechadas a tempo, forçando desligamento');
    process.exit(1);
  }, 15000);
}
