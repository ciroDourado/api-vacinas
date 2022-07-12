module.exports = app => {
  var router = require("express").Router();

  router.get("/", (req, res) => {
    let urls = {
      urls: {
        aplicacao_de_vacinas: [
          { url: "/aplicacao_de_vacinas", método: "POST", descrição: "Cadastrar aplicação de vacinas" },
        ],
        doses: [
          { url: "/doses", método: "GET", descrição: "Listagem de doses" },
          { url: "/doses", método: "POST", descrição: "Cadastro de doses" },
        ],
        doses_das_vacinas: [
          { url: "/doses_das_vacinas", método: "GET", descrição: "Listagem de doses das vacinas" },
        ],
        enderecos: [
          { url: "/enderecos", método: "GET", descrição: "Listagem de endereços" },
          { url: "/enderecos", método: "POST", descrição: "Cadastro de endereços" },
        ],
        vacinados: [
          { url: "/vacinados", método: "GET", descrição: "Listagem de vacinados" },
          { url: "/vacinados", método: "POST", descrição: "Cadastro de vacinados" },
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