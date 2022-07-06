exports.dadosSaoValidos = function (dados, regras) {
  return regras.campos
    .map(campo => campoEValido(dados, campo))
    .reduce(somaLogica);
}

function campoEValido(dados, campo) {
  if (dados.has(campo.nome))
    return campo.validacao(dados.get(campo.nome));
  else return false;
}

function somaLogica(a, b) {
  return a && b;
}