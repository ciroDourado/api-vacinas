module.exports = app => {
  const doses  = require("../../controllers/doses/controller.js");
  var   router = require("express").Router();

  router.get("/", doses.listar);
  router.post("/", doses.criar);

  app.use('/doses', router);
};