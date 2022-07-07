const configuracoes = require('../main.js');

const validacaoMorador = require('../validacao/morador.js');
const validacao        = require('../../validacao/main.js');

let regras_cadastro = {
  campos: [
    {
      nome: 'complemento',
      validacao: complementoEValido
    },
    {
      nome: 'numero',
      validacao: numeroEValido
    },
    {
      nome: 'cep',
      validacao: (input) => true
    },
    {
      nome: 'moradorId',
      validacao: validacaoMorador.idEValido
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
      complemento: formulario.complemento,
      cep: formulario.cep,
      numero: formulario.numero,
      moradorId: formulario.moradorId
    }
  };
  return await configuracoes.repositorio().create(endereco);
}

function numeroEValido(input) {
  return true;
}

function complementoEValido(input) {
  return true;
}