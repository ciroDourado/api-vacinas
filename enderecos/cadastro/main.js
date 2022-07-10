const repositorio = require('../main.js').repositorio();

const validacao = require('../validacao/main.js');
const Request = require('../../helpers/request.js');
const Resultado = require('../../helpers/resultado.js');

let regras = [
  {
    campo: 'complemento',
    validacoes: [
      { validador: validacao.eString, em_caso_de_erro: "O complemento deve ser uma string" },
    ]
  },
  {
    campo: 'numero',
    validacoes: [
      { validador: validacao.eNumero, em_caso_de_erro: "O número deve ser do tipo number" },
      { validador: validacao.ePositivo, em_caso_de_erro: "O número não pode ser menor que zero" },
    ]
  },
  {
    campo: 'cep',
    validacoes: [
      { validador: validacao.eString, em_caso_de_erro: "O CEP deve ser uma string" },
      { validador: validacao.naoVazia, em_caso_de_erro: "O CEP não pode estar vazio" },
      { validador: validacao.tem8Caracteres, em_caso_de_erro: "O CEP deve ter exatamente 8 dígitos" },
      { validador: validacao.saoNumericos, em_caso_de_erro: "O CEP deve conter apenas números" },
    ]
  },
  {
    campo: 'moradorId',
    validacoes: [
      { validador: validacao.eNumero, em_caso_de_erro: "O ID do morador deve ser um numero" },
      { validador: validacao.ePositivo, em_caso_de_erro: "O ID do morador não pode ser menor que zero" },
    ]
  }
]
exports.regrasEndereco = regras

exports.cadastrar = async function (formulario) {
  let resultado = Request.validar(formulario, regras);
  switch (resultado.tipo.rotulo) {
    case "ok": return await cadastrar(formulario);
    case "erro": return resultado;
  }
}

async function cadastrar(formulario) {
  switch (await validacao.moradorECadastrado(formulario.moradorId)) {
    case true: return await cadastrarParaOMorador(formulario);
    case false: return Resultado.erro("O id não pertence a nenhuma pessoa cadastrada");
  }
}

async function cadastrarParaOMorador(formulario) {
  switch (await validacao.moradorAindaNaoPossuiEndereco(formulario.moradorId)) {
    case true: return await cadastrarEndereco(formulario);
    case false: return Resultado.erro("O vacinado já possui um endereço");
  }
}

async function cadastrarEndereco(formulario) {
  let dados = { data: { 
    complemento: formulario.nome,
    numero: formulario.numero,
    cep: formulario.cep,
    moradorId: formulario.moradorId 
  } };
  let endereco = await repositorio.create(dados);
  return Resultado.ok(endereco);
}