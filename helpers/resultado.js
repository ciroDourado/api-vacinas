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

exports.ok      = ok
exports.erro    = erro
exports.entao   = entao
exports.e_entao = e_entao
exports.em_acao = em_acao
exports.validar = validar