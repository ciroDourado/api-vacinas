const repositorio = require('../main.js').repositorio();

const cadastroDose = require('./main.js');
const cadastroDoseDaVacina = require('../../doses_da_vacina/cadastro/main.js');
const validacao = require('../validacao/main.js');
const Request = require('../../helpers/request.js');
const Resultado = require('../../helpers/resultado.js');

let regras = [
  ...cadastroDose.regrasDose,
  {
    campo: "vacinaId",
    validacoes: [
      { validador: validacao.eNumero, em_caso_de_erro: "O ID da vacina deve ser um numero" },
      { validador: validacao.ePositivo, em_caso_de_erro: "O ID da vacina não pode ser menor que zero" },
    ]
  }
]

exports.cadastrar = async function (formulario) {
  let resultado = Request.validar(formulario, regras);
  switch (resultado.tipo.rotulo) {
    case "ok": return await cadastrar(formulario);
    case "erro": return resultado;
  }
}

async function cadastrar(formulario) {
  switch (await validacao.vacinaExiste(formulario.vacinaId)) {
    case true: return await cadastrarParaAVacina(formulario);
    case false: return Resultado.erro("Este ID de vacina não existe");
  }
}

async function cadastrarParaAVacina(formulario) {
  switch( await validacao.nomeExiste(formulario.nome) ) {
    case true: return await criarDoseDaVacina(formulario);
    case false: return await cadastrarDoseParaAVacina(formulario);
  }
}

async function criarDoseDaVacina(formulario) {
  let query = { where: { nome: formulario.nome } };
  let dose  = await repositorio.findUnique(query);
  formulario.doseId = dose.id;
  
  return await cadastroDoseDaVacina.cadastrar(formulario);
}

async function cadastrarDoseParaAVacina(formulario) {
  let resultado = await cadastrarDose(formulario);
  return await criarDoseDaVacina(formulario);
}

async function cadastrarDose(formulario) {
  let dados = {
    data: {
      nome: formulario.nome,
    }
  };
  let dose = await repositorio.create(dados);
  return Resultado.ok(dose);
}