const dosesRepositorio = require('../main.js').repositorio();

exports.eString = function (input) {
  return typeof input === "string";
}

exports.naoVazia = function (string) {
  return string !== "";
}

exports.nomeEUnico = async function (input) {
  let query = { where: { nome: input } }
  let resultado = await dosesRepositorio.findUnique(query);
  return resultado == null;
}