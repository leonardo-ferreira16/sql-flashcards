
/*
 * SQL Flashcards
 * Lógica principal da aplicação.
 */

// 1. Referências aos elementos HTML
const campoAssunto = document.getElementById("assunto");
const botaoBuscar = document.getElementById("btn-buscar");
const resultado = document.getElementById("resultado");

// 2. Função para exibir mensagens
function mostrarMensagem(mensagem) {
    resultado.textContent = mensagem;
}

// 3. Função para buscar os flashcards
function buscarFlashcards() {

    // Lê e padroniza o texto digitado
    const assunto = campoAssunto.value
        .trim()
        .replace(/\s+/g, " ")
        .toUpperCase();

    // Verifica se o campo está vazio
    if (assunto === "") {
        mostrarMensagem("Digite um assunto de SQL para continuar.");
        return;
    }

    // Procura os cartões do assunto
    const cartoes = flashcards[assunto];

    // Verifica se o assunto existe
    if (!cartoes || cartoes.length === 0) {
        mostrarMensagem(
            `Nenhum flashcard encontrado para "${assunto}".`
        );
        return;
    }

    // Cria o título do resultado
    const titulo = document.createElement("h3");
    titulo.textContent = `${assunto} — Cartão 1 de ${cartoes.length}`;

    // Cria o elemento da pergunta
    const pergunta = document.createElement("p");
    pergunta.textContent = cartoes[0].pergunta;

    // Cria o elemento da resposta
    const resposta = document.createElement("p");
    resposta.textContent = cartoes[0].resposta;
    resposta.hidden = true;

    // Cria o botão para revelar a resposta
    const botaoRevelar = document.createElement("button");
    botaoRevelar.textContent = "Revelar resposta";

    botaoRevelar.addEventListener("click", () => {
        resposta.hidden = !resposta.hidden;

        botaoRevelar.textContent = resposta.hidden
            ? "Revelar resposta"
            : "Ocultar resposta";
    });

    // Atualiza a área de resultado
    resultado.replaceChildren(
        titulo,
        pergunta,
        resposta,
        botaoRevelar
    );

    
    // Controla a posição do cartão atual
    let indiceAtual = 0;

    // Cria os botões de navegação
    const botaoAnterior = document.createElement("button");
    botaoAnterior.textContent = "Anterior";

    const botaoProximo = document.createElement("button");
    botaoProximo.textContent = "Próximo";

    // Atualiza os dados exibidos na tela
    function atualizarCartao() {
        const cartao = cartoes[indiceAtual];

        titulo.textContent =
            `${assunto} — Cartão ${indiceAtual + 1} de ${cartoes.length}`;

        pergunta.textContent = cartao.pergunta;
        resposta.textContent = cartao.resposta;

        // Esconde a resposta ao trocar de cartão
        resposta.hidden = true;
        botaoRevelar.textContent = "Revelar resposta";

        // Impede navegação fora dos limites
        botaoAnterior.disabled = indiceAtual === 0;
        botaoProximo.disabled =
            indiceAtual === cartoes.length - 1;
    }

    // Retorna ao cartão anterior
    botaoAnterior.addEventListener("click", () => {
        if (indiceAtual > 0) {
            indiceAtual--;
            atualizarCartao();
        }
    });

    // Avança para o próximo cartão
    botaoProximo.addEventListener("click", () => {
        if (indiceAtual < cartoes.length - 1) {
            indiceAtual++;
            atualizarCartao();
        }
    });

    // Adiciona a navegação na página
    const navegacao = document.createElement("div");
    navegacao.className = "flashcard-actions";

    navegacao.append(botaoAnterior, botaoProximo);
    resultado.appendChild(navegacao);

    atualizarCartao();

}

// 4. Evento do botão de pesquisa
botaoBuscar.addEventListener("click", buscarFlashcards);

// 5. Permite pesquisar pressionando Enter
campoAssunto.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        buscarFlashcards();
    }
});
