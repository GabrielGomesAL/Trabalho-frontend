# Checklist da rubrica

## Arquitetura e organizacao

- Componentes separados por responsabilidade.
- Paginas isoladas em `src/pages`.
- Servicos de API em `src/services`.
- Contexto global em `src/context`.
- Validacoes em `src/utils`.

Evidencias:

- `src/components/layout/Header.jsx`
- `src/components/forms/FormField.jsx`
- `src/components/clientes/ClienteCard.jsx`
- `src/pages/Cadastro.jsx`
- `src/pages/Listagem.jsx`
- `src/context/ClientesContext.jsx`
- `src/services/clientesApi.js`
- `src/utils/clienteValidation.js`

## Navegacao, estado e API

- Navegacao com React Router.
- Estado compartilhado com Context API.
- Dados cadastrados aparecem na listagem.
- API REST consumida com `fetch`.
- Estados de carregamento e erro tratados.

Evidencias:

- `src/App.jsx`
- `src/main.jsx`
- `src/context/ClientesContext.jsx`
- `src/services/clientesApi.js`
- `src/pages/Listagem.jsx`

## Formulario e eventos

- Campos controlados por `useState`.
- Validacao antes do cadastro.
- Uso de `onChange`, `onBlur`, `onSubmit` e `preventDefault()`.
- Feedback visual de erros.
- Mensagem de sucesso apos cadastro.

Evidencias:

- `src/pages/Cadastro.jsx`
- `src/components/forms/FormField.jsx`
- `src/utils/clienteValidation.js`

## Interface e responsividade

- CSS externo em `src/styles/global.css`.
- Layout responsivo com media queries.
- Menu adaptado para telas menores.
- Listagem e formulario ajustados para mobile.

Evidencias:

- `src/styles/global.css`
- `src/components/layout/Header.jsx`
- `src/pages/Home.jsx`
- `src/pages/Cadastro.jsx`
- `src/pages/Listagem.jsx`

## GitHub, commits e Kanban

- Historico com commits granulares.
- Mensagens descrevendo a evolucao do projeto.
- Branch `develop` documentada como branch de desenvolvimento.
- Kanban sugerido em `docs/kanban.md`.
- Scrum documentado em `docs/scrum.md`.
- Repositorio pronto para ser publicado no GitHub.

Evidencias:

- Branch `develop` publicada no GitHub.
- Branch `main` usada como versao estavel.
- Issues #1 a #10 usadas como tarefas da sprint.
- Pull requests de `develop` para `main`.
- Documentacao em `README.md`, `docs/kanban.md`, `docs/scrum.md` e `docs/branches.md`.
