const repositorio = require('../main').repositorio();
const vacinasRepositorio = require('../../vacinas/main.js').repositorio();
const dosesRepositorio   = require('../../doses/main.js').repositorio(); 

exports.eNumero = function (input) {
  return typeof input === "number";
}

exports.ePositivo = function (numero) {
  return numero > 0;
}

exports.vacinaExiste = async function (id) {
  let query = { where: { id: id } }
  let resultado = await vacinasRepositorio.findUnique(query);
  return resultado != null;
}

exports.doseExiste = async function (id) {
  let query = { where: { id: id } }
  let resultado = await dosesRepositorio.findUnique(query);
  return resultado != null;
}

exports.doseEVacinaNaoEstaoRelacionadas = async function (doseId, vacinaId) {
  let query = { 
    where: {
      vacinaId_doseId: {
        doseId: doseId,
        vacinaId:vacinaId
      }
    } 
  };
  let resultado = await repositorio.findUnique(query);
  return resultado == null;
}
