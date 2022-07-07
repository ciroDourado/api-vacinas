// const servicoDeCadastro = require("../../../vacinados/cadastro/main.js"); 
const servicoDeCadastro = require("../../../vacinados/cadastro/com_endereco.js"); 
const servicoDeListagem = require("../../../vacinados/listagem/main.js"); 


exports.criar = async (req, res) => {
  let formulario = req.body;
  let resultado  = await servicoDeCadastro.cadastrar(formulario);
  return res.json(resultado ?? "erro");
};
exports.listar = async (req, res) => {
  let vacinados = await servicoDeListagem.listar();
  return res.json(vacinados);
};
exports.encontrar = (req, res) => {

};
exports.atualizar = (req, res) => {

};
exports.deletar = (req, res) => {

};
