const repositorio = require('../main.js').repositorio();

const validacao = require('../validacao/main.js');
const Request = require('../../helpers/request.js');
const Resultado = require('../../helpers/resultado.js');

let regras = [
  {
    campo: 'nome',
    validacoes: [
      { validador: validacao.eString, em_caso_de_erro: "Deve ser uma string" },
      { validador: validacao.naoVazia, em_caso_de_erro: "Não pode estar vazio" },
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
  switch (await validacao.nomeEUnico(formulario.nome)) {
    case true : return await cadastrarVacina(formulario);
    case false: return Resultado.erro("O nome já está sendo usado");
  }
}

async function cadastrarVacina(formulario) {
  let dados = { data: { nome: formulario.nome } };
  let vacina = await repositorio.create(dados);
  return Resultado.ok(vacina);
}