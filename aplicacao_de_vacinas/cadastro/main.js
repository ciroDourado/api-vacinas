const repositorio = require('../main.js').repositorio();

const validacao = require('../validacao/main.js');
const Request   = require('../../helpers/request.js');
const Resultado = require('../../helpers/resultado.js');

// model VacinasTomadas {
//   vacinado   Vacinado @relation(fields: [vacinadoId], references: [id])
//   vacinadoId Int
//   dose       Dose @relation(fields: [doseId], references: [id])
//   doseId     Int
//   data       DateTime @db.Date

//   @@id([vacinadoId, doseId])
// }

let regras = [
  {
    campo: 'vacinadoId',
    validacoes: [
      { validador: validacao.eNumero, em_caso_de_erro: "O id do vacinado deve ser do tipo number" },
      { validador: validacao.ePositivo, em_caso_de_erro: "O id do vacinado não pode ser menor que zero" },
    ]
  },
  {
    campo: 'doseId',
    validacoes: [
      { validador: validacao.eNumero, em_caso_de_erro: "O id da dose deve ser do tipo number" },
      { validador: validacao.ePositivo, em_caso_de_erro: "O id da dose não pode ser menor que zero" },
    ]
  },
  {
    campo: 'data',
    validacoes: [
      { validador: validacao.eString, em_caso_de_erro: "A data deve ser uma string" },
      { validador: validacao.naoVazia, em_caso_de_erro: "A data não pode estar vazia" },
      { validator: validacao.eData, em_caso_de_erro: "A data não possui o formato AAAA-mm-dd" }
    ]
  }
]

// Verificações assíncronas:
// - o vacinado deve existir
// - a dose da vacina deve existir
// - o vacinado e a dose da vacina devem ser únicos, juntos


exports.cadastrar = async function (formulario) {
  let resultado = Request.validar(formulario, regras);
  switch (resultado.tipo.rotulo) {
    case "ok": return await cadastrar(formulario);
    case "erro": return resultado;
  }
}
