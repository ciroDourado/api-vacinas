const servicoDeCadastro = require("../../../cadastro/vacinados/main.js"); 
const servicoDeListagem = require("../../../listagem/vacinados/main.js"); 


exports.criar = async (req, res) => {
  let formulario = {
    nome: req.body.nome,
    cpf: req.body.cpf
  };
  let resultado = await servicoDeCadastro.cadastrar(formulario);
  return res.json(resultado);
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
