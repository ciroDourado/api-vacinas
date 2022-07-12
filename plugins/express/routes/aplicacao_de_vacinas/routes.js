module.exports = app => {
  const aplicacao_de_vacinas = require("../../controllers/aplicacao_de_vacinas/controller.js");
  var   router = require("express").Router();

  router.post("/"                 , aplicacao_de_vacinas.criar);
  router.post("/consulta/cpf"     , aplicacao_de_vacinas.buscaPorCpf);
  router.post("/consulta/vacinado", aplicacao_de_vacinas.buscaPorVacinado);

  app.use('/aplicacao_de_vacinas', router);
};