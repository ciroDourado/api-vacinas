const configuracoes = require('../main.js');

const validacaoCpf = require('../validacao/cpf.js');
const validacao    = require('../../validacao/main.js');

let regras_cadastro = {
  campos: [
    {
      nome: 'nome',
      validacao: nomeEValido
    },
    {
      nome: 'cpf',
      validacao: validacaoCpf.cpfEValido
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
  let vacinado = {
    data: {
      nome: formulario.nome,
      cpf: formulario.cpf,
    }
  };
  return await configuracoes.repositorio().create(vacinado);
}

function nomeEValido(input) {
  return true;
}
