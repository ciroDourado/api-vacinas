const configuracoes = require('../main.js');

const validacao = require('../../validacao/main.js');

let regras_cadastro = {
  campos: [
    {
      nome: 'nome',
      validacao: nomeEValido
    },
  ]
};

exports.cadastrar = async function (formulario) {
  if (await validacao.dadosSaoValidos(formulario, regras_cadastro)) {
    return await cadastro(formulario);
  } 
  return null;
}

async function cadastro(formulario) {
  let endereco = {
    data: {
      nome: formulario.nome,
    }
  };
  return await configuracoes.repositorio().create(endereco);
}

async function nomeEValido(input) {
  let eString  = typeof input === "string";
  let naoVazia = input !== "";
  return (await nomeEUnico(input)) && eString && naoVazia;
}


async function nomeEUnico(input) {
  let resultado = await configuracoes
    .repositorio()
    .findUnique({ where: { nome: input } });
  return resultado == null;
}