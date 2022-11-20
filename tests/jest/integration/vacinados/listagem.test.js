let conficuracoesDoses = require("../../../../doses/main.js");
let conficuracoesVacinas = require("../../../../enderecos/main.js");
let conficuracoesDosesDasVacinas = require("../../../../doses_da_vacina/main.js");
let conficuracoesAplicacoes = require("../../../../aplicacao_de_vacinas/main.js");
let conficuracoesEnderecos = require("../../../../enderecos/main.js");
let configuracoesVacinados = require("../../../../vacinados/main.js"); 
let vacinados = require('../../../../vacinados/listagem/main.js');

beforeAll(async () => {
  await configuracoesVacinados.repositorio().deleteMany({});
  await conficuracoesEnderecos.repositorio().deleteMany({});
  await conficuracoesAplicacoes.repositorio().deleteMany({});
  await conficuracoesDosesDasVacinas.repositorio().deleteMany({});
  await conficuracoesVacinas.repositorio().deleteMany({});
  await conficuracoesDoses.repositorio().deleteMany({});
})

let teste_1 = () => {
  vacinados.listar().then(data => expect(data.length).toBe(0))
};
it("o sistema sem vacinados cadastrados retorna uma lista vazia", teste_1);