module.exports = app => {
  const enderecos = require("../../controllers/enderecos/controller.js");
  var   router    = require("express").Router();

  router.get("/" , enderecos.listar);
  router.post("/", enderecos.criar);

  app.use('/enderecos', router);
};