const servicoDeListagem = require("../../../../doses_da_vacina/listagem/main.js"); 


exports.criar = async (req, res) => {
  
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
