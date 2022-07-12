const servicoDeBusca = {
  por_cpf     : require("../../../../aplicacao_de_vacinas/consulta/por_cpf.js"),
  por_vacinado: require("../../../../aplicacao_de_vacinas/consulta/por_vacinado.js")
}
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
exports.buscaPorCpf = async (req, res) => {
  let formulario = req.body;
  let resultado = await servicoDeBusca.por_cpf.consultar(formulario);
  return res.json(resultado);
};
exports.buscaPorVacinado = async (req, res) => {
  let formulario = req.body;
  let resultado = await servicoDeBusca.por_vacinado.consultar(formulario);
  return res.json(resultado);
};
exports.atualizar = (req, res) => {

};
exports.deletar = (req, res) => {

};
