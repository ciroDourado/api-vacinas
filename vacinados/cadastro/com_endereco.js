const configuracoes = require('../main.js');

const vacinados = require('./main.js');
const enderecos = require('../../enderecos/cadastro/main.js');

exports.cadastrar = async function (formulario) {
  let vacinado = await vacinados.cadastrar(formulario);
  if (vacinado != null) {
    formulario.moradorId = vacinado.id;
    let endereco = await enderecos.cadastrar(formulario);
    if (endereco != null) {
      return await configuracoes.repositorio().findUnique({
        where: {id: vacinado.id},
        include: {endereco: true}
      });
    }
    return vacinado;
  }
  return null;
}
