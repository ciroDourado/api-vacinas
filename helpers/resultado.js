const TipoDeResultado = {
	ok:   { codigo: 1, rotulo: "ok"   },
	erro: { codigo: 2, rotulo: "erro" }
}

const TipoDeErro = {
	padrao: "Ocorreu um erro"
}

function ok(variavel)
{
	return { tipo: TipoDeResultado.ok, valor: variavel };
}

function erro(mensagem)
{
	return { tipo: TipoDeResultado.erro, valor: mensagem };
}

function entao(resultado, acao)
{
	switch (resultado.tipo) {
		case TipoDeResultado.ok  : return { tipo: TipoDeResultado.ok, valor: acao(resultado.valor) };
		case TipoDeResultado.erro: return resultado;
	}
}

function e_entao(resultado, acao)
{
	switch (resultado.tipo) {
		case TipoDeResultado.ok  : return acao(resultado.valor);
		case TipoDeResultado.erro: return resultado;
	}
}

function em_acao(condicao, mensagem)
{
	return valor => condicao (valor) ?
		ok(valor) :
		erro(mensagem);
}

function validar(variavel, validacoes)
{
	let inicial  = ok(variavel);
	let acoes    = validacoes.map(acao);
	let resposta = acoes.reduce(repassando_resultado, inicial);
	return resposta;
}

function continuar_validacao(inicial, validacoes)
{
	let acoes    = validacoes.map(acao);
	let resposta = acoes.reduce(repassando_resultado, inicial);
	return resposta;
}

function acao(validacao)
{
	let condicao = validacao.validador;
	let mensagem = validacao.em_caso_de_erro;
	return em_acao(condicao, mensagem);
}

function repassando_resultado(resultado, acao)
{
	return e_entao(resultado, acao);
}

function e(resultado1, resultado2) {
	let codigo1 = resultado1.tipo.codigo;
	let codigo2 = resultado2.tipo.codigo; 
	let codigos = `${codigo1}${codigo2}`;
	switch(codigos) {
		case '11': return resultado1;
		case '12': return resultado2;
		case '21': return resultado1;
		case '22': return resultado1;
	}
}


exports.ok      = ok
exports.erro    = erro
exports.entao   = entao
exports.e_entao = e_entao
exports.em_acao = em_acao
exports.validar = validar
exports.continuar_validacao = continuar_validacao
exports.e = e