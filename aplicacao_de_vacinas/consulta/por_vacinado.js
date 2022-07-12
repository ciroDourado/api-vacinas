const repositorio = require('../../vacinados/main.js').repositorio();
const validacao   = require('../validacao/main.js');
const Request     = require('../../helpers/request.js');
const Resultado   = require('../../helpers/resultado.js');

let regras = [
  {
    campo: 'vacinadoId',
    validacoes: [
      { validador: validacao.eNumero, em_caso_de_erro: "O id do vacinado deve ser do tipo number" },
      { validador: validacao.ePositivo, em_caso_de_erro: "O id do vacinado não pode ser menor que zero" }
    ]
  }
]

exports.consultar = async function (formulario) {
  let resultado = Request.validar(formulario, regras);
  switch (resultado.tipo.rotulo) {
    case "ok": return await verificarVacinado(formulario);
    case "erro": return resultado;
  }
}

async function verificarVacinado(formulario) {
  let vacinado  = formulario.vacinadoId;
  let resultado = await validacao.vacinadoExiste(vacinado);
  switch (resultado) {
    case true: return await consultar(formulario);
    case false: return Resultado.erro("O vacinado não foi encontrado no sistema");
  }
}

async function consultar(formulario) {
  let query    = { 
    where: { id: formulario.vacinadoId }, 
    select: { 
      vacinas: { 
        select: { 
          dose: true, 
          vacina: true,
          vacinado: {
            select: { cpf: true }
          }
        } 
      } 
    } 
  };
  let vacinado = await repositorio.findUnique(query);
  return vacinado;
}
