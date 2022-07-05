const express = require("express")
const cors    = require("cors")
const env     = process.env

var url_encoded_parser = express.urlencoded({extended: true})
var json_parser        = express.json()
var cors_module        = cors({origin: "http://localhost:9001"})

const app = express()

// módulos acoplados na aplicação
app.use(cors_module)
app.use(json_parser)
app.use(url_encoded_parser)

// rotas
app.get("/", (req, res) => res.json("testando"))
// require("routes/vacinas/routes.js")(app)

const port = env.APPLICATION_PORT || 9000
app.listen(port, () => console.log(`Servindo na porta: ${port}`))
