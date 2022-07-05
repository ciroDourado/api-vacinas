const { PrismaClient } = require('@prisma/client')
const cors             = require("cors")
const express          = require("express")

// variáveis de ambiente
const env  = process.env
const url  = env.APPLICATION_URL  || "http://localhost"
const port = env.APPLICATION_PORT || 9000

// módulos para serem acoplados na aplicação
var url_encoded_parser = express.urlencoded({extended: true})
var json_parser = express.json()
var cors_module        = cors({origin: `${url}:9001`})

// clients
const app    = express()
const prisma = new PrismaClient()

// acoplação de módulos na aplicação
app.use(cors_module)
app.use(json_parser)
app.use(url_encoded_parser)

// rotas
app.get("/", (req, res) => {
  let urls = {
    urls: {
      vacinados: [
        {url: "/vacinados", método: "GET", descrição: "Listagem de vacinados"}
      ]
    }
  }
  return res.json(urls)
})
app.get("/vacinados", async (req, res) => {
  let vacinados = await prisma
    .vacinado
    .findMany()
  return res.json({vacinados: vacinados})
}) 
// require("routes/vacinas/routes.js")(app)

app.listen(port, () => console.log(`Servindo na porta: ${port}`))
