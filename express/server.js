const cors    = require("cors")
const express = require("express")

// variáveis de ambiente
const env = process.env

// módulos para serem acoplados na aplicação
var url_encoded_parser = express.urlencoded({extended: true})
var json_parser        = express.json()
var cors_module        = cors({ origin: `${env.APPLICATION_PORT}:${env.CORS_PORT}`})

// clients
const app = express()

// acoplação de módulos na aplicação
app.use(cors_module)
app.use(json_parser)
app.use(url_encoded_parser)

// rotas
require("../express/routes/home.js")(app)
require("../express/routes/vacinas/routes.js")(app)

app.listen(env.APPLICATION_PORT)
