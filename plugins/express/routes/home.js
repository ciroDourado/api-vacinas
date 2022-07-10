module.exports = app => {
  var router = require("express").Router();

  router.get("/", (req, res) => {
    let urls = {
      urls: {
        doses: [
          { url: "/doses", método: "GET", descrição: "Listagem de doses" },
          { url: "/doses", método: "POST", descrição: "Cadastro de doses" },
        ],
        enderecos: [
          { url: "/enderecos", método: "GET", descrição: "Listagem de endereços" },
          { url: "/enderecos", método: "POST", descrição: "Cadastro de endereços" },
        ],
        vacinados: [
          { url: "/vacinados", método: "GET", descrição: "Listagem de vacinados" },
          { url: "/vacinados", método: "POST", descrição: "Cadastro de vacinados" },
        ],
        vacinas: [
          { url: "/vacinas", método: "GET", descrição: "Listagem de vacinas" },
          { url: "/vacinas", método: "POST", descrição: "Cadastro de vacinas" },
        ],
      }
    }
    return res.json(urls)
  })

  app.use('/', router);
};