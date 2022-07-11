const repositorio = require('../main.js').repositorio();

exports.listar = async function () {
  let query = { 
    // include: { dose: true, vacina: true },
    select: { dose: true, vacina: true }
  };
  return await repositorio.findMany(query);
}