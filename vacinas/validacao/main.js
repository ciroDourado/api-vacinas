const repositorio = require('../main.js').repositorio();

exports.eString = function (input) {
  return typeof input === "string";
}

exports.naoVazia = function (input) {
  return input !== "";
}

exports.nomeEUnico = async function (input) {
  let resultado = await repositorio.findUnique({ where: { nome: input } });
  return resultado === null;
}