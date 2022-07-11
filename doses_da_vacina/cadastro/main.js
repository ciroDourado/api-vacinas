const repositorio = require('../main.js').repositorio();

const validacao = require('../validacao/main.js');
const Request = require('../../helpers/request.js');
const Resultado = require('../../helpers/resultado.js');

let regras = [
  {
    campo: 'vacinaId',
    validacoes: [
      { validador: validacao.eNumero, em_caso_de_erro: "O id da vacina deve ser do tipo number" },
      { validador: validacao.ePositivo, em_caso_de_erro: "O id da vacina não pode ser menor que zero" },
    ]
  },
  {
    campo: 'doseId',
    validacoes: [
      { validador: validacao.eNumero, em_caso_de_erro: "O id da dose deve ser do tipo number" },
      { validador: validacao.ePositivo, em_caso_de_erro: "O id da dose não pode ser menor que zero" },
    ]
  },
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
    case false: return Resultado.erro("O id não pertence a nenhuma vacina cadastrada");
  }
}

async function cadastrarParaAVacina(formulario) {
  switch (await validacao.doseExiste(formulario.doseId)) {
    case true: return await cadastrarDoseParaAVacina(formulario);
    case false: return Resultado.erro("O id não pertence a nenhuma dose cadastrada");
  }
}

async function cadastrarDoseParaAVacina(formulario) {
  switch (await validacao.doseEVacinaNaoEstaoRelacionadas(formulario.doseId, formulario.vacinaId)) {
    case true: return await cadastrarDoseDaVacina(formulario);
    case false: return Resultado.erro("Esta vacina e dose já estão relacinadas");
  }
}

async function cadastrarDoseDaVacina(formulario) {
  let dados = { data: { 
    vacinaId: formulario.vacinaId,
    doseId: formulario.doseId,
  } };
  let doseDaVacina = await repositorio.create(dados);
  return Resultado.ok(doseDaVacina);
}