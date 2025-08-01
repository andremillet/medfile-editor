# Guia de Desenvolvimento do MedFile Editor

Este documento detalha o processo de desenvolvimento do **MedFile Editor**, servindo como um guia para futuras manutenções e contribuições. A aplicação foi construída como uma Single Page Application (SPA) que roda inteiramente no lado do cliente.

## 1. Estrutura do Projeto

A estrutura de arquivos foi organizada da seguinte forma:

```
/medfile-editor/
|-- index.html         # Arquivo principal da aplicação
|-- css/
|   |-- style.css      # Estilos da UI e do painel de visualização
|-- js/
|   |-- app.js         # Lógica principal da aplicação e interatividade
|   |-- medfile-parser.js # Módulo com a função de parsing de .med para HTML
|   |-- monaco-config.js # Configuração do Monaco Editor e da sintaxe .med
|-- README.md          # Apresentação do projeto
|-- DESENVOLVIMENTO.md # Este guia
```

## 2. Passo a Passo do Desenvolvimento

### Passo 1: Estrutura HTML e CSS

-   **HTML (`index.html`)**: Foi criada a estrutura semântica da página, contendo:
    -   Um `<header>` para a barra de ferramentas com os botões de ação.
    -   Um `<main>` dividido em duas seções: `#editor-container` para o Monaco Editor e `#preview-container` para a visualização.
    -   Os scripts do Monaco Editor (via CDN) e os arquivos JavaScript locais foram incluídos no final do `<body>`.
-   **CSS (`css/style.css`)**: Foi utilizado Flexbox para criar o layout de duas colunas. Estilos básicos foram aplicados para a barra de ferramentas, botões e os painéis. Também foram incluídas regras `@media print` para otimizar a impressão, escondendo a interface do editor.

### Passo 2: Integração do Monaco Editor

-   **Configuração (`js/monaco-config.js`)**: O Monaco Editor foi inicializado na `div` `#editor-container`.
-   **Loader**: Em vez de baixar a biblioteca, foi utilizado o loader do Monaco via CDN para simplificar a configuração.

### Passo 3: Definição da Linguagem `.med`

-   **Registro da Linguagem**: Em `js/monaco-config.js`, uma nova linguagem chamada `medfile` foi registrada usando `monaco.languages.register`.
-   **Destaque de Sintaxe (Tokenizer)**: Foi utilizado `monaco.languages.setMonarchTokensProvider` para definir as regras de tokenização (destaque de sintaxe) baseadas em expressões regulares, conforme a especificação do formato `.med`:
    -   Seções como `[ANAMNESE]`.
    -   Tags de anamnese como `!HPP`.
    -   Tags de exames como `@NOME_EXAME[DATA]:`.
    -   Tags de conduta como `+`, `-`, `>>` e `!DESMAME`.
    -   Comentários entre colchetes.

### Passo 4: Lógica do Parser `.med` para HTML

-   **Função `parseMedFile` (`js/medfile-parser.js`)**: Foi criada uma função que recebe o texto do editor e o converte para uma string HTML.
-   **Expressões Regulares**: A função utiliza uma série de substituições com expressões regulares (`.replace()`) para transformar cada elemento da sintaxe `.med` em sua tag HTML correspondente (e.g., `<h2>` para seções, `<h4>` para tags, `<ul>` e `<li>` para listas).

### Passo 5: Implementação da Interatividade

-   **Lógica Principal (`js/app.js`)**: Este arquivo orquestra a aplicação.
-   **Atualização em Tempo Real**: Um event listener (`editor.onDidChangeModelContent`) foi adicionado ao Monaco Editor. A cada alteração no conteúdo, ele chama a função `parseMedFile` e atualiza o `innerHTML` do painel de visualização.
-   **Botões da Barra de Ferramentas**:
    -   **Novo Arquivo**: Limpa o conteúdo do editor.
    -   **Abrir Arquivo**: Usa um `<input type="file">` e a `FileReader API` para ler o conteúdo de um arquivo local e carregá-lo no editor.
    -   **Salvar Arquivo**: Pega o conteúdo do editor, cria um `Blob` e o oferece para download no navegador.
    -   **Imprimir/Exportar PDF**: Aciona a função de impressão do navegador (`window.print()`), que utiliza as regras de CSS `@media print`.

## 3. Hospedagem com GitHub Pages

O projeto foi versionado com Git e hospedado no GitHub. Para a publicação, foi utilizada a funcionalidade do GitHub Pages:

1.  O repositório foi criado no GitHub.
2.  O código foi enviado para a branch `master`.
3.  Uma branch chamada `gh-pages` foi criada e enviada ao GitHub.
4.  O GitHub automaticamente detectou a branch `gh-pages` e publicou o site em `https://<username>.github.io/<repository-name>/`.
