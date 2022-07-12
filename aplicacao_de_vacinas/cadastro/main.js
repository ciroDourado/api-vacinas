const repositorio = require('../main.js').repositorio();

const validacao = require('../validacao/main.js');
const Request   = require('../../helpers/request.js');
const Resultado = require('../../helpers/resultado.js');

// model VacinasTomadas {
//   vacinado       Vacinado @relation(fields: [vacinadoId], references: [id])
//   vacinadoId     Int
//   vacina         Vacina @relation(fields: [vacinaId], references: [id])
//   vacinaId       Int
//   dose           Dose @relation(fields: [doseId], references: [id])
//   doseId         Int
//   data           DateTime @db.Date

//   @@id([vacinadoId, vacinaId, doseId])
// }

let regras = [
  {
    campo: 'vacinadoId',
    validacoes: [
      { validador: validacao.eNumero, em_caso_de_erro: "O id do vacinado deve ser do tipo number" },
      { validador: validacao.ePositivo, em_caso_de_erro: "O id do vacinado não pode ser menor que zero" }
    ]
  },
  {
    campo: 'vacinaId',
    validacoes: [
      { validador: validacao.eNumero, em_caso_de_erro: "O id da vacina deve ser do tipo number" },
      { validador: validacao.ePositivo, em_caso_de_erro: "O id da vacina não pode ser menor que zero" }
    ]
  },
  {
    campo: 'doseId',
    validacoes: [
      { validador: validacao.eNumero, em_caso_de_erro: "O id da dose deve ser do tipo number" },
      { validador: validacao.ePositivo, em_caso_de_erro: "O id da dose não pode ser menor que zero" }
    ]
  },
  {
    campo: 'data',
    validacoes: [
      { validador: validacao.eString, em_caso_de_erro: "A data deve ser uma string" },
      { validador: validacao.naoVazia, em_caso_de_erro: "A data não pode estar vazia" },
      { validador: validacao.eData, em_caso_de_erro: "A data não possui o formato AAAA-mm-dd" }
    ]
  }
]

// Verificações assíncronas:
// - o vacinado deve existir
// - a vacina deve existir
// - a dose da vacina deve existir
// - a vacina deve ter a dose enviada
// - o vacinado, a vacina e a dose devem ser únicos, juntos

exports.cadastrar = async function (formulario) {
  let resultado = Request.validar(formulario, regras);
  switch (resultado.tipo.rotulo) {
    case "ok"  : return await verificarVacinado(formulario);
    case "erro": return resultado;
  }
}

async function verificarVacinado(formulario) {
  let vacinado  = formulario.vacinadoId;
  let resultado = await validacao.vacinadoExiste(vacinado);
  switch (resultado) {
    case true : return await verificarVacina(formulario);
    case false: return Resultado.erro("O vacinado não foi encontrado no sistema");
  }
}

async function verificarVacina(formulario) {
  let vacina    = formulario.vacinaId;
  let resultado = await validacao.vacinaExiste(vacina);
  switch (resultado) {
    case true : return await verificarDose(formulario);
    case false: return Resultado.erro("A vacina dada não foi encontrada nos registros");
  }
}

async function verificarDose(formulario) {
  let dose      = formulario.doseId;
  let resultado = await validacao.doseExiste(dose);
  switch (resultado) {
    case true : return await verificarVinculoDoseEVacina(formulario);
    case false: return Resultado.erro("A dose dada não foi encontrada nos registros");
  }
}

async function verificarVinculoDoseEVacina(formulario) {
  let dose      = formulario.doseId;
  let vacina    = formulario.vacinaId;
  let resultado = await validacao.dosePertenceAVacina(dose, vacina);
  switch (resultado) {
    case true : return await verificarAplicacaoDaDose(formulario);
    case false: return Resultado.erro("A vacina não possui a dose dada");
  }
}

async function verificarAplicacaoDaDose(formulario) {
  let dose      = formulario.doseId;
  let vacina    = formulario.vacinaId;
  let vacinado  = formulario.vacinadoId;
  let resultado = await validacao.doseNaoFoiAplicada(dose, vacina, vacinado);
  switch (resultado) {
    case true : return await cadastrar(formulario);
    case false: return Resultado.erro("O paciente já recebeu esta dose");
  }
}

async function cadastrar(formulario) {
  let dados = {
    data: {
      vacinadoId: formulario.vacinadoId,
      vacinaId: formulario.vacinaId,
      doseId: formulario.doseId,
      data: new Date(formulario.data),
    }
  };
  let aplicacao = await repositorio.create(dados);
  return Resultado.ok(aplicacao);
}

