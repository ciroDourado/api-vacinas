const servicoDeCadastro = require("../../../vacinas/cadastro/main.js"); 
const servicoDeListagem = require("../../../vacinas/listagem/main.js"); 


exports.criar = async (req, res) => {
  let formulario = req.body;
  let resultado = await servicoDeCadastro.cadastrar(formulario);
  return res.json(resultado ?? "erro");
};
exports.listar = async (req, res) => {
  let vacinas = await servicoDeListagem.listar();
  return res.json(vacinas);
};
exports.encontrar = (req, res) => {

};
exports.atualizar = (req, res) => {

};
exports.deletar = (req, res) => {

};
