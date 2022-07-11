const dosesRepositorio   = require('../main.js').repositorio();
const vacinasRepositorio = require('../../vacinas/main.js').repositorio(); 

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

exports.nomeEUnico = async function (nome) {
  let query = { where: { nome: nome } }
  let resultado = await dosesRepositorio.findUnique(query);
  return resultado == null;
}

exports.nomeExiste = async function (nome) {
  let query = { where: { nome: nome } }
  let resultado = await dosesRepositorio.findUnique(query);
  return resultado != null;
}

exports.vacinaExiste = async function (id) {
  let query = { where: { id: id } };
  let resultado = await vacinasRepositorio.findUnique(query);
  return resultado != null; 
}