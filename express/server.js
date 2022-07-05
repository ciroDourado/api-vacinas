import   cors               from "cors"
import   express            from "express"
import { urlencoded, json } from "express"
import { PrismaClient }     from '@prisma/client'
const env = process.env

// módulos para serem acoplados na aplicação
var url_encoded_parser = urlencoded({extended: true})
var json_parser        = json()
var cors_module        = cors({origin: "http://localhost:9001"})

// clients
const app    = express()
const prisma = new PrismaClient()

// acoplação de módulos na aplicação
app.use(cors_module)
app.use(json_parser)
app.use(url_encoded_parser)

// rotas
app.get("/"         ,       (req, res) => res.json("testando"))
app.get("/vacinados", async (req, res) => {
  let vacinados = await prisma
    .vacinado
    .findMany()
  return res.json({vacinados: vacinados})
}) 
// require("routes/vacinas/routes.js")(app)

const port = env.APPLICATION_PORT || 9000
app.listen(port, () => console.log(`Servindo na porta: ${port}`))
