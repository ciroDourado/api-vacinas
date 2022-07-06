const { PrismaClient } = require("@prisma/client")
const   repositorio    = new PrismaClient()

const validacaoCpf = require('../validacao/cpf.js');
const validacao    = require('../validacao/main.js');

exports.cadastrar = async function (formulario)
{
  let campos = Object.entries(formulario);
  let dados  = new Map(campos);
  let regras = regras_cadastro();

  if (validacao.dadosSaoValidos(dados, regras)) {
    let vacinado = {
      data: {
        nome: dados.get('nome'),
        cpf: dados.get('cpf')
      }
    };
    await repositorio
      .vacinado
      .create(vacinado);
    return "ok";
  } else return "error";
}

function regras_cadastro()
{
  return {
    campos: [
      { nome: 'nome', validacao: nomeEValido },
      { nome: 'cpf' , validacao: validacaoCpf.cpfEValido }
    ]
  };
}

function nomeEValido(input) {
  let eString  = typeof input === "string";
  let naoVazia = input !== "";
  return eString && naoVazia;
}