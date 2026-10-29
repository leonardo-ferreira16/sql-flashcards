
/*
 * SQL Flashcards
 * Pesquisa, navegação, autoavaliação e progresso.
 */

// Elementos da página
const campoAssunto = document.getElementById("assunto");
const botaoBuscar = document.getElementById("btn-buscar");
const resultado = document.getElementById("resultado");

// Chaves de armazenamento
const CHAVE_PROGRESSO = "sql_flashcards_progresso";
const CHAVE_ASSUNTO = "sql_flashcards_ultimo_assunto";

// Estado da aplicação
let assuntoAtual = "";
let cartoesAtuais = [];
let indiceAtual = 0;
let respostaVisivel = false;

// Recupera as avaliações armazenadas
function carregarAvaliacoes() {
    try {
        const dados = JSON.parse(
            localStorage.getItem(CHAVE_PROGRESSO)
        );

        if (dados && typeof dados === "object"
            && !Array.isArray(dados)) {
            return dados;
        }
    } catch (erro) {
        console.warn("Não foi possível carregar o progresso.", erro);
    }

    return {};
}

const avaliacoes = carregarAvaliacoes();

// Armazena as avaliações
function salvarProgresso() {
    try {
        localStorage.setItem(
            CHAVE_PROGRESSO,
            JSON.stringify(avaliacoes)
        );
    } catch (erro) {
        console.warn("Não foi possível salvar o progresso.", erro);
    }
}

// Cria elementos HTML utilizando textContent
function criarElemento(tag, texto, classe = "") {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;

    if (classe) {
        elemento.className = classe;
    }

    return elemento;
}

// Exibe mensagens ao usuário
function mostrarMensagem(mensagem) {
    resultado.textContent = mensagem;
}

// Calcula o progresso do assunto atual
function calcularProgresso() {
    const lista = avaliacoes[assuntoAtual] || [];

    return {
        revisados: lista.filter(valor => typeof valor === "boolean").length,
        conhecidos: lista.filter(valor => valor === true).length,
        desconhecidos: lista.filter(valor => valor === false).length
    };
}

// Registra uma avaliação
function avaliarCartao(sabia) {
    avaliacoes[assuntoAtual][indiceAtual] = sabia;

    salvarProgresso();
    exibirCartao();
}

// Altera o flashcard atual
function mudarCartao(direcao) {
    const novoIndice = indiceAtual + direcao;

    if (novoIndice < 0 || novoIndice >= cartoesAtuais.length) {
        return;
    }

    indiceAtual = novoIndice;
    respostaVisivel = false;

    exibirCartao();
}

// Atualiza a interface do cartão
function exibirCartao() {
    const cartao = cartoesAtuais[indiceAtual];
    const progresso = calcularProgresso();

    // Identificação e pergunta
    const titulo = criarElemento(
        "h3",
        `${assuntoAtual} — Cartão ${indiceAtual + 1} de ${cartoesAtuais.length}`
    );

    const pergunta = criarElemento(
        "p",
        cartao.pergunta,
        "flashcard-question"
    );

    // Resposta
    const resposta = criarElemento(
        "p",
        cartao.resposta,
        "flashcard-answer"
    );

    resposta.hidden = !respostaVisivel;

    // Botão revelar/ocultar
    const botaoRevelar = criarElemento(
        "button",
        respostaVisivel ? "Ocultar resposta" : "Revelar resposta"
    );

    botaoRevelar.addEventListener("click", () => {
        respostaVisivel = !respostaVisivel;
        exibirCartao();
    });

    // Autoavaliação
    const areaAvaliacao = document.createElement("div");
    areaAvaliacao.className = "flashcard-evaluation";
    areaAvaliacao.hidden = !respostaVisivel;

    const textoAvaliacao = criarElemento(
        "p",
        "Você sabia a resposta?"
    );

    const avaliacaoAtual = avaliacoes[assuntoAtual][indiceAtual];

    const botaoNaoSabia = criarElemento(
        "button",
        avaliacaoAtual === false ? "✓ Não sabia" : "Não sabia",
        "btn-nao-sabia"
    );

    const botaoSabia = criarElemento(
        "button",
        avaliacaoAtual === true ? "✓ Sabia" : "Sabia",
        "btn-sabia"
    );

    if (avaliacaoAtual === false) {
        botaoNaoSabia.classList.add("selecionado");
    }

    if (avaliacaoAtual === true) {
        botaoSabia.classList.add("selecionado");
    }

    botaoNaoSabia.addEventListener("click", () => {
        avaliarCartao(false);
    });

    botaoSabia.addEventListener("click", () => {
        avaliarCartao(true);
    });

    areaAvaliacao.append(
        textoAvaliacao,
        botaoNaoSabia,
        botaoSabia
    );

    // Navegação
    const navegacao = document.createElement("div");
    navegacao.className = "flashcard-actions";

    const botaoAnterior = criarElemento("button", "Anterior");
    const botaoProximo = criarElemento("button", "Próximo");

    botaoAnterior.disabled = indiceAtual === 0;
    botaoProximo.disabled = indiceAtual === cartoesAtuais.length - 1;

    botaoAnterior.addEventListener("click", () => mudarCartao(-1));
    botaoProximo.addEventListener("click", () => mudarCartao(1));

    navegacao.append(botaoAnterior, botaoProximo);

    // Indicadores de progresso
    const painelProgresso = document.createElement("div");
    painelProgresso.className = "flashcard-progress";

    const textoProgresso = criarElemento(
        "p",
        `Revisados: ${progresso.revisados}/${cartoesAtuais.length} | ` +
        `Sabia: ${progresso.conhecidos} | ` +
        `Não sabia: ${progresso.desconhecidos}`
    );

    const barraProgresso = document.createElement("progress");
    barraProgresso.max = cartoesAtuais.length;
    barraProgresso.value = progresso.revisados;
    barraProgresso.setAttribute("aria-label", "Progresso da revisão");

    painelProgresso.append(textoProgresso, barraProgresso);

    // Atualiza a página
    resultado.replaceChildren(
        titulo,
        pergunta,
        resposta,
        botaoRevelar,
        areaAvaliacao,
        navegacao,
        painelProgresso
    );
}

// Pesquisa flashcards pelo assunto
function buscarFlashcards() {
    const assunto = campoAssunto.value
        .trim()
        .replace(/\s+/g, " ")
        .toUpperCase();

    if (!assunto) {
        mostrarMensagem("Digite um assunto de SQL para continuar.");
        return;
    }

    if (!Object.hasOwn(flashcards, assunto)
        || !Array.isArray(flashcards[assunto])
        || flashcards[assunto].length === 0) {
        mostrarMensagem(`Nenhum flashcard encontrado para "${assunto}".`);
        return;
    }

    assuntoAtual = assunto;
    cartoesAtuais = flashcards[assunto];
    indiceAtual = 0;
    respostaVisivel = false;

    // Inicializa e valida as avaliações do assunto
    const anteriores = Array.isArray(avaliacoes[assunto])
        ? avaliacoes[assunto]
        : [];

    avaliacoes[assunto] = cartoesAtuais.map((_, indice) => {
        const valor = anteriores[indice];
        return typeof valor === "boolean" ? valor : null;
    });

    try {
        localStorage.setItem(CHAVE_ASSUNTO, assunto);
    } catch (erro) {
        console.warn("Não foi possível salvar o assunto.", erro);
    }

    exibirCartao();
}

// Eventos de pesquisa
botaoBuscar.addEventListener("click", buscarFlashcards);

campoAssunto.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        buscarFlashcards();
    }
});

// Recupera o último assunto estudado
try {
    const ultimoAssunto = localStorage.getItem(CHAVE_ASSUNTO);

    if (ultimoAssunto && Object.hasOwn(flashcards, ultimoAssunto)) {
        campoAssunto.value = ultimoAssunto;
        buscarFlashcards();
    }
} catch (erro) {
    console.warn("Não foi possível recuperar o último assunto.", erro);
}
