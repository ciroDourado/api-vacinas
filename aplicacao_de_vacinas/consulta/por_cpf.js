const repositorio = require('../../vacinados/main.js').repositorio();
const consulta    = require('./por_vacinado.js');
const validacao   = require('../../vacinados/validacao/main.js');
const Request     = require('../../helpers/request.js');
const Resultado   = require('../../helpers/resultado.js');

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
  }
]

exports.consultar = async function (formulario) {
  let resultado = Request.validar(formulario, regras);
  switch (resultado.tipo.rotulo) {
    case "ok"  : return await verificarVacinado(formulario);
    case "erro": return resultado;
  }
}

async function verificarVacinado(formulario) {
  let vacinado = formulario.cpf;
  let resultado = await validacao.cpfExiste(vacinado);
  switch (resultado) {
    case true : return await consultar(formulario);
    case false: return Resultado.erro("Não há registros com este CPF no sistema");
  }
}

async function consultar(formulario) {
  let query = { where: { cpf: formulario.cpf } };
  let vacinado = await repositorio.findUnique(query);
  formulario.vacinadoId = vacinado.id;
  return await consulta.consultar(formulario);
}
