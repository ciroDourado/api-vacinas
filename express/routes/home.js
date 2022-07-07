module.exports = app => {
  var router = require("express").Router();

  router.get("/", (req, res) => {
    let urls = {
      urls: {
        // vacinas: [
        //   { url: "/vacinas", método: "GET", descrição: "Listagem de vacinas" },
        //   { url: "/vacinas", método: "POST", descrição: "Cadastro de vacinas" },
        //   { url: "/vacinas/:id", método: "GET", descrição: "Busca de vacina" },
        //   { url: "/vacinas/:id", método: "PUT", descrição: "Atualização de vacina" },
        //   { url: "/vacinas/:id", método: "DELETE", descrição: "Deletar vacina" }
        // ],
        vacinados: [
          { url: "/vacinados", método: "GET", descrição: "Listagem de vacinados" },
          { url: "/vacinados", método: "POST", descrição: "Cadastro de vacinados" },
          // { url: "/vacinados/:id", método: "GET", descrição: "Busca de vacinado" },
          // { url: "/vacinados/:id", método: "PUT", descrição: "Atualização de vacinado" },
          // { url: "/vacinados/:id", método: "DELETE", descrição: "Deletar vacinado" }
        ],
        enderecos: [
          { url: "/enderecos", método: "GET", descrição: "Listagem de endereços" },
          { url: "/enderecos", método: "POST", descrição: "Cadastro de endereços" },
        ]
      }
    }
    return res.json(urls)
  })

  app.use('/', router);
};