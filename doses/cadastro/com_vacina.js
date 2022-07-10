// const repositorio = require('../main.js').repositorio();

// const cadastroDose = require('./main.js');
// const validacao = require('../validacao/main.js');
// const Request = require('../../helpers/request.js');
// const Resultado = require('../../helpers/resultado.js');

// let regras = [
//   ...cadastroDose.regrasDose,
//   {
//     campo: "vacinaId"
//   }
// ]
// exports.regrasDose = regras

// exports.cadastrar = async function (formulario) {
//   let resultado = Request.validar(formulario, regras);
//   switch (resultado.tipo.rotulo) {
//     case "ok": return await cadastrar(formulario);
//     case "erro": return resultado;
//   }
// }

// async function cadastrar(formulario) {
//   switch (await validacao.nomeEUnico(formulario.nome)) {
//     case true: return await cadastrarDose(formulario);
//     case false: return Resultado.erro("O nome desta dose já está sendo usado");
//   }
// }

// async function cadastrarDose(formulario) {
//   let dados = {
//     data: {
//       nome: formulario.nome,
//     }
//   };
//   let dose = await repositorio.create(dados);
//   return Resultado.ok(dose);
// }