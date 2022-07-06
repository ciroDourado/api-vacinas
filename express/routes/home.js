module.exports = app => {
  var router = require("express").Router();

  router.get("/", (req, res) => {
    let urls = {
      urls: {
        vacinas: [
          { url: "/vacinas", método: "GET", descrição: "Listagem de vacinas" },
          { url: "/vacinas", método: "POST", descrição: "Cadastro de vacinas" },
          { url: "/vacinas/:id", método: "GET", descrição: "Busca de vacina" },
          { url: "/vacinas/:id", método: "PUT", descrição: "Atualização de vacina" },
          { url: "/vacinas/:id", método: "DELETE", descrição: "Deletar vacina" }
        ]
      }
    }
    return res.json(urls)
  })

  app.use('/', router);
};