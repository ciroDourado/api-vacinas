let Request = require('../../../../helpers/request.js');

let teste_1 = () => {
  let necessarios = [
    { campo: "A" }
  ];
  let formulario = {
    D: "valor de D",
    E: "valor de E",
    F: "valor de F"
  };
  let resultado = Request.validarCampos(formulario, necessarios)
  expect(resultado.tipo.codigo).toBe(2)
};
test("a validação de campos retornará erro caso não tenha pelo menos os campos necessários", teste_1);

let teste_2 = () => {
  let necessarios = [
    { campo: "A" }
  ];
  let formulario = {
    A: "valor de A",
    D: "valor de D",
    E: "valor de E",
    F: "valor de F"
  };
  let resultado = Request.validarCampos(formulario, necessarios)
  expect(resultado.tipo.codigo).toBe(1)
};
test("a validação de campos não se importa caso o formulário traga mais campos além dos necessários", teste_2);

let teste_3 = () => {
  let necessarios = [
    { campo: "A" },
    { campo: "B" },
    { campo: "C" },
  ];
  let formulario = {
    A: "valor de A",
    B: "valor de B",
    C: "valor de C",
    F: "valor de F"
  };
  let resultado = Request.validarCampos(formulario, necessarios)
  expect(resultado.tipo.codigo).toBe(1)
};
test("para ser bem-sucedido, todos os campos necessários devem estar presentes", teste_3);

let teste_4 = () => {
  let regras = [
    {
      campo: "A",
      validacoes: [
        {
          validador: input => input.length != 0,
          em_caso_de_erro: "este campo não pode estar vazio"
        }
      ]
    },
  ];
  let formulario = {
    A: "valor de A",
  };
  let resultado = Request.validar(formulario, regras)
  expect(resultado.tipo.codigo).toBe(1)
};
test("para ser bem-sucedido, os campos necessários devem passar nas validações", teste_4);

let teste_5 = () => {
  let regras = [
    {
      campo: "A",
      validacoes: [
        {
          validador: input => input.length != 0,
          em_caso_de_erro: "este campo não pode estar vazio"
        }
      ]
    },
  ];
  let formulario = {
    A: "",
  };
  let resultado = Request.validar(formulario, regras)
  expect(resultado.tipo.codigo).toBe(2)
};
test("caso o campo necessário não passe na validação, é retornado erro", teste_5);