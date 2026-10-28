const flashcards = {

    "SELECT": [
        {
            pergunta: "Para que serve o comando SELECT?",
            resposta: "Seleciona colunas ou expressões para retornar dados em uma consulta SQL."
        },
        {
            pergunta: "Qual a função do SELECT *?",
            resposta: "Retornar todas as colunas disponíveis da tabela consultada."
        },
        {
            pergunta: "Para que serve o DISTINCT?",
            resposta: "Eliminar linhas duplicadas do resultado considerando as colunas selecionadas."
        },
        {
            pergunta: "Qual a finalidade do AS?",
            resposta: "Definir um alias, ou seja, um nome alternativo para uma coluna ou tabela."
        }
    ],

    "WHERE": [
        {
            pergunta: "Para que serve a cláusula WHERE?",
            resposta: "Filtrar registros que atendem a uma condição."
        },
        {
            pergunta: "Qual a diferença entre AND e OR?",
            resposta: "AND exige que ambas as condições sejam verdadeiras. OR exige pelo menos uma."
        },
        {
            pergunta: "Para que serve o operador BETWEEN?",
            resposta: "Verificar se um valor está dentro de um intervalo, incluindo os limites."
        },
        {
            pergunta: "Como verificar se um campo possui NULL?",
            resposta: "Utilizando IS NULL ou IS NOT NULL."
        }
    ],

    "JOIN": [
        {
            pergunta: "Para que serve o INNER JOIN?",
            resposta: "Retornar registros com correspondência entre as tabelas relacionadas."
        },
        {
            pergunta: "O que faz o LEFT JOIN?",
            resposta: "Retorna todas as linhas da tabela à esquerda e as correspondências da direita."
        },
        {
            pergunta: "Qual a diferença entre INNER JOIN e LEFT JOIN?",
            resposta: "INNER JOIN retorna correspondências. LEFT JOIN também mantém linhas sem correspondência da tabela esquerda."
        },
        {
            pergunta: "Para que serve a cláusula ON?",
            resposta: "Definir a condição utilizada para relacionar registros em um JOIN."
        }
    ],

    "GROUP BY": [
        {
            pergunta: "Para que serve o GROUP BY?",
            resposta: "Agrupar registros que possuem valores em comum nas colunas indicadas."
        },
        {
            pergunta: "Qual a função do COUNT()?",
            resposta: "Contar registros ou valores não nulos, dependendo da expressão utilizada."
        },
        {
            pergunta: "Para que serve o HAVING?",
            resposta: "Filtrar grupos, geralmente utilizando condições sobre funções de agregação."
        },
        {
            pergunta: "Qual a diferença entre WHERE e HAVING?",
            resposta: "WHERE filtra registros antes do agrupamento. HAVING filtra grupos após a agregação."
        }
    ],

    "ORDER BY": [
        {
            pergunta: "Para que serve o ORDER BY?",
            resposta: "Ordenar os registros retornados por uma consulta."
        },
        {
            pergunta: "Qual a função do ASC?",
            resposta: "Definir a ordenação crescente dos resultados."
        },
        {
            pergunta: "Qual a função do DESC?",
            resposta: "Definir a ordenação decrescente dos resultados."
        },
        {
            pergunta: "É possível ordenar por mais de uma coluna?",
            resposta: "Sim. Basta informar várias colunas no ORDER BY, separadas por vírgulas."
        }
    ],

    "CTE": [
        {
            pergunta: "O que significa CTE?",
            resposta: "Common Table Expression, ou Expressão de Tabela Comum."
        },
        {
            pergunta: "Qual comando inicia uma CTE?",
            resposta: "O comando WITH."
        },
        {
            pergunta: "Qual a principal vantagem de utilizar CTE?",
            resposta: "Organizar consultas complexas em partes mais legíveis e reutilizáveis dentro da instrução."
        },
        {
            pergunta: "É possível utilizar várias CTEs em uma consulta?",
            resposta: "Sim. Podemos declarar múltiplas CTEs após o WITH, separadas por vírgulas."
        }
    ]
};
