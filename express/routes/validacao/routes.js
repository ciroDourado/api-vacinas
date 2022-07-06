module.exports = app => {
  const validacoes = require("../../controllers/validacao/controller.js");
  var   router     = require("express").Router();

  router.post("/cpf",  validacoes.cpf);

  app.use('/validacao', router);
};