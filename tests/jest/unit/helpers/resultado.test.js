let Resultado = require('../../../../helpers/resultado.js');

let teste_1 = () => {
  let resultado = Resultado.ok("any");
  expect(resultado.tipo.codigo).toBe(1)
};
test("encapsulador 'ok' retorna uma estrutura, em que seu tipo possui código 1", teste_1);

let teste_2 = () => {
  let resultado = Resultado.erro("Erro genérico");
  expect(resultado.tipo.codigo).toBe(2)
};
test("encapsulador 'erro' retorna uma estrutura, em que seu tipo possui código 2", teste_2);

let teste_3 = () => {
  let resultado = Resultado.ok("any");
  let maiuscula = string => string.toUpperCase()
  expect(Resultado.entao(resultado, maiuscula).tipo.codigo).toBe(1)
};
test("caso uma estrutura 'ok' (de código 1) seja passada para 'entao', será retornada uma nova estrutura 'ok' (também de código 1)", teste_3);

let teste_4 = () => {
  let resultado = Resultado.erro("Erro genérico");
  let acao = jest.fn()
  Resultado.entao(resultado, acao)
  expect(acao).not.toBeCalled()
};
test("caso uma estrutura 'erro' (de código 2) seja passada para 'entao', nada é executado", teste_4);

let teste_5 = () => {
  let resultado = Resultado.erro("Erro genérico");
  let maiuscula = string => string.toUpperCase()
  let erro = Resultado.entao(resultado, maiuscula)
  expect(resultado).toBe(erro)
};
test("caso uma estrutura 'erro' (de código 2) seja passada para 'entao', a mesma estrutura é retornada", teste_5);

let teste_6 = () => {
  let resultado = Resultado.ok("any");
  let acao = jest.fn()
  Resultado.e_entao(resultado, acao)
  expect(acao).toBeCalled()
};
test("caso uma estrutura 'ok' seja passada para 'e_entao', a ação deve ser executada", teste_6);