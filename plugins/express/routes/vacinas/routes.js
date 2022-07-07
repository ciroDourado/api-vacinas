module.exports = app => {
  const vacinas = require("../../controllers/vacinas/controller.js");
  var   router  = require("express").Router();

  router.get ("/", vacinas.listar);
  router.post("/", vacinas.criar );

  app.use('/vacinas', router);
};