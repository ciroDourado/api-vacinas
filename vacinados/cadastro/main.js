const repositorio = require('../main.js').repositorio();

const validacao = require('../validacao/main.js');
const Request = require('../../helpers/request.js');
const Resultado = require('../../helpers/resultado.js');

let regras = [
  {
    campo: 'cpf',
    validacoes: [
      { validador: validacao.eString, em_caso_de_erro: "O CPF deve ser uma string" },
      { validador: validacao.naoVazia, em_caso_de_erro: "O CPF não pode estar vazio" },
      { validador: validacao.eNumerico, em_caso_de_erro: "O CPF deve conter apenas números" },
      { validador: validacao.tem11Caracteres, em_caso_de_erro: "O CPF deve ter exatamente 11 dígitos" },
      { validador: validacao.digitosSaoValidos, em_caso_de_erro: "A combinação de dígitos do CPF não é válida" },
    ]
  },
  {
    campo: 'nome',
    validacoes: [
      { validador: validacao.eString, em_caso_de_erro: "O nome do paciente deve ser uma string" },
      { validador: validacao.naoVazia, em_caso_de_erro: "O nome do paciente não pode estar vazio" },
    ]
  }
]
exports.regrasVacinado = regras

exports.cadastrar = async function (formulario) {
  let resultado = Request.validar(formulario, regras);
  switch (resultado.tipo.rotulo) {
    case "ok": return await cadastrar(formulario);
    case "erro": return resultado;
  }
}
async function cadastrar(formulario) {
  switch (await validacao.cpfEUnico(formulario.moradorId)) {
    case true: return await cadastrarPaciente(formulario);
    case false: return Resultado.erro("O CPF dado já pertence à outro cadastro no sistema");
  }
}

async function cadastrarPaciente(formulario) {
  let dados = {
    data: {
      nome: formulario.nome,
      cpf: formulario.cpf,
    }
  };
  let paciente = await repositorio.create(dados);
  return Resultado.ok(paciente);
}
