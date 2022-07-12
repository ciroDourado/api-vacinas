const servicoDeCadastro = require("../../../../aplicacao_de_vacinas/cadastro/por_cpf.js");


exports.criar = async (req, res) => {
  let formulario = req.body;
  let resultado  = await servicoDeCadastro.cadastrar(formulario);
  return res.json(resultado);
};
exports.listar = async (req, res) => {

};
exports.encontrar = (req, res) => {

};
exports.atualizar = (req, res) => {

};
exports.deletar = (req, res) => {

};
