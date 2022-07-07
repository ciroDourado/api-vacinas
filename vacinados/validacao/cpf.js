const configuracoes = require('../main.js');

exports.cpfEValido = async function (input) {
  let eString = typeof input === "string";
  let eNumerico = !isNaN(input);
  let tem11Caracteres = input.length == 11;
  console.log(await cpfEUnico(input));
  return eString 
    && eNumerico 
    && tem11Caracteres 
    && digitosSaoValidos(input) 
    && (await cpfEUnico(input));
}

async function cpfEUnico(input) {
  let resultado = await configuracoes
    .repositorio()
    .findUnique({ where: { cpf: input } });
  return resultado == null;
}

function digitosSaoValidos(digitosCpf) {
  return naoSaoRepetidos(digitosCpf)
    && passaNoPrimeiroTeste(digitosCpf)
    && passaNoSegundoTeste(digitosCpf);
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