const repositorio = require('../main.js').repositorio();

exports.eString = function(input) {
  return typeof input === "string";
}

exports.naoVazia = function (string) {
  return string !== "";
}

exports.eNumerico = function (string) {
  return ! isNaN(string);
}

exports.tem11Caracteres = function (digitos) {
  return digitos.length == 11;
}

exports.digitosSaoValidos = function (digitos) {
  return naoSaoRepetidos(digitos)
    && passaNoPrimeiroTeste(digitos)
    && passaNoSegundoTeste(digitos);
}

exports.cpfEUnico = async function (input) {
  let query     = { where: { cpf: input } }
  let resultado = await repositorio.findUnique(query);
  return resultado == null;
}

exports.cpfExiste = async function (cpf) {
  let query = { where: { cpf: cpf } }
  let resultado = await repositorio.findUnique(query);
  return resultado != null;
}


function naoSaoRepetidos(digitosCpf) {
  let invalidos = new Set([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ]);
  return !invalidos.has(digitosCpf);
}

function passaNoPrimeiroTeste(digitosCpf) {
  let novePrimeirosDigitos = digitosCpf.slice(0, 9).split("").map(char => Number(char));
  let sequenciaDecrescente = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  let somatorio = zip(novePrimeirosDigitos, sequenciaDecrescente)
    .map(multiplica)
    .reduce(soma);
  let resto = (somatorio * 10) % 11;
  let resultado = (resto == 10) ? 0 : resto;
  let primeiroDigitoVerificador = Number(digitosCpf.charAt(9));
  return resultado === primeiroDigitoVerificador;
}

function passaNoSegundoTeste(digitosCpf) {
  let dezPrimeirosDigitos = digitosCpf.slice(0, 10).split("").map(char => Number(char));
  let sequenciaDecrescente = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  let somatorio = zip(dezPrimeirosDigitos, sequenciaDecrescente)
    .map(multiplica)
    .reduce(soma);
  let resto = (somatorio * 10) % 11;
  let resultado = (resto == 10) ? 0 : resto;
  let segundoDigitoVerificador = Number(digitosCpf.charAt(10));
  return resultado === segundoDigitoVerificador;
}

function zip(array1, array2) {
  return array1.map((valor, indice) => [valor, array2[indice]]);
}

function multiplica(par) {
  return par[0] * par[1];
}

function soma(a, b) {
  return a + b;
}