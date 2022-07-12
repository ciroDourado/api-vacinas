let Resultado = require('./resultado.js')

exports.validar = function (formulario, regras) {
  let validarInputs = campos => this.validarInputs(campos, regras);
  let resultado_request = this.validarCampos(formulario, regras);
  return Resultado.e_entao(resultado_request, validarInputs);
}

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

exports.validarInputs = function (campos, regras) {
  return regras
    .map(validador(campos))
    .map(aplicar)
    .reduce(Resultado.e);
}

function validador(campos) {
  return regra => validadorPara(campos, regra);
}

function validadorPara(campos, regra) {
  return {
    variavel: campos.get(regra.campo),
    validacoes: regra.validacoes
  };
}

function aplicar(validador) {
  return Resultado.validar(validador.variavel, validador.validacoes);
}