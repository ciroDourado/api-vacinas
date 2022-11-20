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