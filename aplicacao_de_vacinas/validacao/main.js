let vacinadosRepositorio       = require('../../vacinados/main.js').repositorio();
let vacinasRepositorio         = require('../../vacinas/main.js').repositorio();
let dosesRepositorio           = require('../../doses/main.js').repositorio();
let dosesDasVacinasRepositorio = require('../../doses_da_vacina/main.js').repositorio();
let aplicacaoRepositorio       = require('../main.js').repositorio();

exports.eNumero = function (input) {
  return typeof input === "number";
}

exports.ePositivo = function (numero) {
  return numero > 0;
}

exports.eString = function (input) {
  return typeof input === "string";
}

exports.naoVazia = function (string) {
  return string !== "";
}

exports.eData = function (data) {
  let segundos = Date.parse(data);
  return !isNaN(segundos);
}

exports.vacinadoExiste = async function (vacinadoId) {
  let query = { where: { id: vacinadoId } }
  let resultado = await vacinadosRepositorio.findUnique(query);
  return resultado != null;
}

exports.vacinaExiste = async function (vacinaId) {
  let query = { where: { id: vacinaId } }
  let resultado = await vacinasRepositorio.findUnique(query);
  return resultado != null;
}

exports.doseExiste = async function (doseId) {
  let query = { where: { id: doseId } }
  let resultado = await dosesRepositorio.findUnique(query);
  return resultado != null;
}

exports.dosePertenceAVacina = async function (doseId, vacinaId) {
  let composta = { doseId: doseId, vacinaId: vacinaId };
  let query = { where: { vacinaId_doseId: composta } };
  let resultado = await dosesDasVacinasRepositorio.findUnique(query);
  return resultado != null;
}

exports.doseNaoFoiAplicada = async function (doseId, vacinaId, vacinadoId) {
  let composta = { doseId: doseId, vacinaId: vacinaId, vacinadoId: vacinadoId };
  let query = { where: { vacinadoId_vacinaId_doseId: composta } };
  let resultado = await aplicacaoRepositorio.findUnique(query);
  return resultado == null;
}
