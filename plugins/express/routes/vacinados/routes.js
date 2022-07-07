module.exports = app => {
  const vacinados = require("../../controllers/vacinados/controller.js");
  var   router    = require("express").Router();

  router.get ("/", vacinados.listar);
  router.post("/", vacinados.criar);

  app.use('/vacinados', router);
};