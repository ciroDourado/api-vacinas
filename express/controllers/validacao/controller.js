const validacaoCpf = require("../../../cadastro/validacao/cpf.js"); 

exports.cpf = (request, response) => {
  let cpf = request.body.cpf;

  if (validacaoCpf.cpfEValido(cpf)) {
    return response.json("correto");
  } else return response.json("erro");
};
