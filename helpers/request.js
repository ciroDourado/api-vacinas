let Resultado = require('./resultado.js')

exports.validarCampos = function (formulario, regras) {
  let campos      = Object.entries(formulario);

  let enviados    = new Map(campos);
  let necessarios = regras.map(regra => regra.campo);
  return camposExistem(enviados, necessarios);
}

function camposExistem(enviados, necessarios) {
  let validacoes = necessarios.map(validacao);
  return Resultado.validar(enviados, validacoes);
}

function validacao(necessario) {
  return {
    validador: campoExiste(necessario),
    em_caso_de_erro: `O campo '${necessario}' não foi enviado`
  }
}

function campoExiste(necessario) {
  return enviados => enviados.has(necessario);
}