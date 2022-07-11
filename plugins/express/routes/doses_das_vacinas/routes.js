module.exports = app => {
  const doses_das_vacinas = require("../../controllers/doses_das_vacinas/controller.js");
  var   router            = require("express").Router();

  router.get("/", doses_das_vacinas.listar);

  app.use('/doses_das_vacinas', router);
};