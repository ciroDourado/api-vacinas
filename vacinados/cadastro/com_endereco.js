const repositorio = require('../main.js').repositorio();

const validacao = require('../validacao/main.js');
const Request = require('../../helpers/request.js');
const Resultado = require('../../helpers/resultado.js');

let regras = [
  ...require('./main').regrasVacinado,
  ...require('../../enderecos/cadastro/main').regrasEndereco
].filter(regra => regra.campo !== "moradorId")

exports.cadastrar = async function (formulario) {
  let resultado = Request.validar(formulario, regras);
  switch (resultado.tipo.rotulo) {
    case "ok": return await cadastrar(formulario);
    case "erro": return resultado;
  }
}

async function cadastrar(formulario) {
  switch (await validacao.cpfEUnico(formulario.cpf)) {
    case true: return await cadastrarPaciente(formulario);
    case false: return Resultado.erro("Este CPF já está cadastrado no sistema");
  }
}

async function cadastrarPaciente(formulario) {
  let dadosEndereco = {
    complemento: formulario.complemento,
    numero: formulario.numero,
    cep: formulario.cep,
  }
  let dadosPaciente = {
    data: {
      nome: formulario.nome,
      cpf: formulario.cpf,
      endereco: {
        create: dadosEndereco
      }
    }
  };
  let paciente = await repositorio.create(dadosPaciente);
  return Resultado.ok(paciente);
}
