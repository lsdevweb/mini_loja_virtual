# Casa Serena — loja virtual demonstrativa

Projeto de front-end para portfólio: uma vitrine fictícia de decoração, com catálogo responsivo, filtros por categoria e sacola de compras funcional no navegador.

> **Demonstração:** esta loja não vende produtos reais. O checkout é apenas ilustrativo: nenhum pedido é enviado e nenhum pagamento é processado.

## Visão geral

A Casa Serena é uma marca fictícia criada para apresentar uma experiência de loja virtual. A interface foi pensada para funcionar em telas grandes e pequenas e inclui:

- Página inicial com apresentação da marca e chamada para explorar a coleção.
- Catálogo com oito produtos fictícios.
- Filtros por categoria: decoração, iluminação e têxteis.
- Sacola lateral com inclusão de produtos, ajuste de quantidades e subtotal.
- Persistência da sacola no `localStorage` do navegador.
- Layout adaptável, estados de foco para teclado, textos alternativos nas imagens e avisos acessíveis para atualizações da interface.

## Tecnologias

- HTML semântico
- CSS responsivo
- JavaScript sem dependências
- `localStorage` para salvar a sacola localmente

## Como executar

Não é necessário instalar dependências nem configurar um servidor.

1. Baixe ou clone este repositório.
2. Abra `index.html` em um navegador.

Para desenvolver no Visual Studio Code, também é possível abrir a pasta do projeto e usar uma extensão de servidor local, como o Live Server.

É necessária uma conexão com a internet para carregar as imagens do Unsplash e as fontes do Google Fonts. Sem conexão, os recursos externos podem não aparecer, mas os arquivos HTML, CSS e JavaScript continuam no projeto.

## Estrutura

```text
mini_loja_virtual/
├── index.html   # Estrutura e conteúdo da página
├── style.css    # Identidade visual e comportamento responsivo
├── script.js    # Produtos, filtros e lógica da sacola
└── README.md    # Documentação do projeto
```

## Como funciona a sacola

Os produtos estão cadastrados como dados JavaScript em `script.js`. Ao adicionar ou remover unidades, a sacola e o subtotal são atualizados na página e salvos no armazenamento local do navegador.

Isso é adequado para uma demonstração de front-end, mas não equivale a um banco de dados. Os dados:

- ficam apenas no navegador e no dispositivo em que foram criados;
- não são compartilhados entre visitantes ou dispositivos;
- podem ser apagados pelo usuário ao limpar os dados do navegador.

O projeto não tem autenticação, painel administrativo, controle de estoque, envio de pedidos ou integração com pagamentos. Para uma loja real, seria necessário conectar a interface a um backend, banco de dados e provedor de pagamento apropriados.

## Imagens e créditos

As imagens são carregadas de URLs do Unsplash e as fontes vêm do Google Fonts. Consulte os termos e a licença das imagens antes de reutilizá-las ou publicar o projeto em outro contexto, especialmente em trabalhos comerciais. Mesmo quando a atribuição não for obrigatória, creditar os fotógrafos é uma boa prática. Como os arquivos são carregados externamente, sua disponibilidade depende desses serviços e de conexão com a internet.

## Personalização

Para adaptar a demonstração a uma necessidade específica:

1. Atualize nome, textos e conteúdo institucional em `index.html`.
2. Ajuste cores, tipografia e layout em `style.css`.
3. Edite os produtos, categorias, preços e imagens no array `products` de `script.js`.
4. Se mudar a chave de armazenamento da sacola, atualize `storageKey` em `script.js`.

## Uso em portfólio

Apresente o projeto como uma **loja virtual demonstrativa de front-end**, e informe que o checkout não é real. Uma publicação do site estático pode ser feita em serviços de hospedagem de páginas estáticas; para exibir a sacola entre sessões, o visitante precisa usar o mesmo navegador e dispositivo.
