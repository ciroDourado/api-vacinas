const servicoDeCadastro = require("../../../enderecos/cadastro/main.js"); 
const servicoDeListagem = require("../../../enderecos/listagem/main.js"); 


exports.criar = async (req, res) => {
  let formulario = req.body;
  let resultado  = await servicoDeCadastro.cadastrar(formulario);
  return res.json(resultado ?? "erro");
};
exports.listar = async (req, res) => {
  let enderecos = await servicoDeListagem.listar();
  return res.json(enderecos);
};
exports.encontrar = (req, res) => {

};
exports.atualizar = (req, res) => {

};
exports.deletar = (req, res) => {

};
