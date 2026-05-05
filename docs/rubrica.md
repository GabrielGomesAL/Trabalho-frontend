# Checklist da rubrica

## Arquitetura e organizacao

- Componentes separados por responsabilidade.
- Paginas isoladas em `src/pages`.
- Servicos de API em `src/services`.
- Contexto global em `src/context`.
- Validacoes em `src/utils`.

## Navegacao, estado e API

- Navegacao com React Router.
- Estado compartilhado com Context API.
- Dados cadastrados aparecem na listagem.
- API REST consumida com `fetch`.
- Estados de carregamento e erro tratados.

## Formulario e eventos

- Campos controlados por `useState`.
- Validacao antes do cadastro.
- Uso de `onChange`, `onBlur`, `onSubmit` e `preventDefault()`.
- Feedback visual de erros.
- Mensagem de sucesso apos cadastro.

## Interface e responsividade

- CSS externo em `src/styles/global.css`.
- Layout responsivo com media queries.
- Menu adaptado para telas menores.
- Listagem e formulario ajustados para mobile.

## GitHub, commits e Kanban

- Historico com commits granulares.
- Mensagens descrevendo a evolucao do projeto.
- Kanban sugerido em `docs/kanban.md`.
- Repositorio pronto para ser publicado no GitHub.
