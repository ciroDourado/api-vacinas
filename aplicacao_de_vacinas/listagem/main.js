const repositorio = require('../main.js').repositorio();

exports.listar = async function () {
  return await repositorio.findMany();
}