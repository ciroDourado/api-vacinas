// module.exports = app => {
//   const vacinas = require("../../controllers/vacinas/controller.js");
//   var   router  = require("express").Router();

//   router.get   ("/"   , vacinas.listar   );
//   router.post  ("/"   , vacinas.criar    );
//   router.get   ("/:id", vacinas.encontrar);
//   router.put   ("/:id", vacinas.atualizar);
//   router.delete("/:id", vacinas.deletar  );

//   app.use('/vacinas', router);
// };