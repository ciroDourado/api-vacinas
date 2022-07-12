module.exports = app => {
  const aplicacao_de_vacinas = require("../../controllers/aplicacao_de_vacinas/controller.js");
  var   router = require("express").Router();

  router.post("/", aplicacao_de_vacinas.criar);

  app.use('/aplicacao_de_vacinas', router);
};