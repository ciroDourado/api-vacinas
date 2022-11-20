let validacao = require('../../../../vacinados/validacao/main.js');

let teste_1 = () => {
  let cpf = "00000000000"
  expect(validacao.tem11Caracteres(cpf)).toBe(true)
};
test("validador 'tem11Caracteres' retorna 'true' apenas quando a string possui length 11", teste_1);

let teste_2 = () => {
  let cpf = "00000"
  expect(validacao.tem11Caracteres(cpf)).toBe(false)
};
test("validador 'tem11Caracteres' retorna 'false' sempre que a string não possui length 11", teste_2);

let teste_3 = () => {
  let cpf = "00000000000"
  expect(validacao.digitosSaoValidos(cpf)).toBe(false)
};
test("cpf não pode possuir o mesmo dígito em sequência", teste_3);