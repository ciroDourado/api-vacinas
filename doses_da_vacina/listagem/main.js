const repositorio = require('../main.js').repositorio();

exports.listar = async function () {
  let query = { select: { dose: true, vacina: true } };
  let doses_das_vacinas = await repositorio.findMany(query);
  return doses_das_vacinas.reduce(agrupando, {});
}

function agrupando(agrupados, dose_da_vacina) {
  let id = dose_da_vacina.vacina.id;
  switch ( id in agrupados ) {
    case true: return adicionarNovaDose(agrupados, dose_da_vacina);
    case false: return adicionarNovaVacina(agrupados, dose_da_vacina);
  }
}

function adicionarNovaDose(agrupados, dose_da_vacina) {
  let {id}          = dose_da_vacina.vacina;
  let vacina        = agrupados[id];
  let nova          = adicionarDose(vacina, dose_da_vacina.dose);
  let novo_registro = { ...agrupados };
  novo_registro[id] = nova;
  return novo_registro;
}

function adicionarDose(vacina, dose) {
  return {
    nome: vacina.nome,
    doses: [dose, ...vacina.doses]
  };
}

function criarVacina(nome) {
  return {
    nome: nome,
    doses: []
  };
} 

function adicionarNovaVacina(agrupados, dose_da_vacina) {
  let {id, nome}    = dose_da_vacina.vacina;
  let vacina        = criarVacina(nome);
  let nova          = adicionarDose(vacina, dose_da_vacina.dose);
  let novo_registro = { ...agrupados };
  novo_registro[id] = nova;
  return novo_registro;
}