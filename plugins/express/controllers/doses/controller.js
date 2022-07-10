const servicoDeCadastro = require("../../../../doses/cadastro/main.js"); 
const servicoDeListagem = require("../../../../doses/listagem/main.js"); 


exports.criar = async (req, res) => {
  let formulario = req.body;
  let resultado  = await servicoDeCadastro.cadastrar(formulario);
  return res.json(resultado);
};
exports.listar = async (req, res) => {
  let doses = await servicoDeListagem.listar();
  return res.json(doses);
};
exports.encontrar = (req, res) => {

};
exports.atualizar = (req, res) => {

};
exports.deletar = (req, res) => {

};
