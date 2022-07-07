const configuracoes = require('../main.js');

exports.listar = async function () {
  return await configuracoes.repositorio().findMany();
}