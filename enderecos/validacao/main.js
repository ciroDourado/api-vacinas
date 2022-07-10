const enderecosRepositorio = require('../main.js').repositorio();
const vacinadosRepositorio = require('../../vacinados/main.js').repositorio();

exports.eString = function (input) {
  return typeof input === "string";
}

exports.naoVazia = function (string) {
  return string !== "";
}

exports.eNumero = function (input) {
  return typeof input === "number";
}

exports.ePositivo = function (numero) {
  return numero > 0;
}

exports.tem8Caracteres = function (string) {
  return string.length == 8;
}

exports.saoNumericos = function (string) {
  return !isNaN(string);
}

exports.moradorECadastrado = async function (moradorId) {
  let query = { where: { id: moradorId } };
  let resultado = await vacinadosRepositorio.findUnique(query);
  return resultado != null;
}

exports.moradorAindaNaoPossuiEndereco = async function (moradorId) {
  let query = { where: { moradorId: moradorId } };
  let resultado = await enderecosRepositorio.findUnique(query);
  return resultado == null;
}