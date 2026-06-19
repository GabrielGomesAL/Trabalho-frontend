# Checklist final da rubrica

## Arquitetura e organização

- Componentes separados por responsabilidade e domínio.
- Páginas isoladas em `src/pages`.
- Serviços de API em `src/services`.
- Contexto global em `src/context`.
- Validações em `src/utils`.

Evidências:

- `src/components/layout/Header.jsx`
- `src/components/forms/FormField.jsx`
- `src/components/clientes/ClienteRow.jsx`
- `src/components/forms/FormProgress.jsx`
- `src/components/home/WorkflowPreview.jsx`
- `src/pages/Cadastro.jsx`
- `src/pages/Listagem.jsx`
- `src/context/ClientesContext.jsx`
- `src/services/clientesApi.js`
- `src/utils/clienteValidation.js`

## Navegação, estado e API

- Navegação com React Router.
- Estado compartilhado com Context API.
- Dados cadastrados aparecem imediatamente na listagem.
- API REST consumida com `fetch`.
- Estados de carregamento, sucesso, erro, timeout e nova tentativa tratados.
- Requisições anteriores são canceladas para evitar condições de corrida.
- Dados externos são normalizados no serviço antes de chegar à interface.

Evidências:

- `src/App.jsx`
- `src/main.jsx`
- `src/context/ClientesContext.jsx`
- `src/services/clientesApi.js`
- `src/pages/Listagem.jsx`

## Formulário e eventos

- Campos controlados por `useState`.
- Validação antes do cadastro.
- Uso de `onChange`, `onBlur`, `onSubmit` e `preventDefault()`.
- Feedback visual e acessível de erros com `aria-invalid` e `aria-describedby`.
- Mensagem de sucesso após cadastro.
- Progresso de preenchimento reativo.

Evidências:

- `src/pages/Cadastro.jsx`
- `src/components/forms/FormField.jsx`
- `src/utils/clienteValidation.js`

## Interface e responsividade

- CSS externo em `src/styles/global.css`.
- Layout responsivo com media queries.
- Menu adaptado para telas menores.
- Listagem em tabela no desktop e registros empilhados no mobile.
- Formulário e painel de progresso ajustados para telas menores.
- Foco visível, link para pular ao conteúdo e movimento reduzido respeitado.

Evidências:

- `src/styles/global.css`
- `src/components/layout/Header.jsx`
- `src/pages/Home.jsx`
- `src/pages/Cadastro.jsx`
- `src/pages/Listagem.jsx`

## Qualidade e validação técnica

- Testes automatizados para telefone, campos obrigatórios, cadastro válido e
  limite de observações.
- Build de produção executado sem erros.
- Auditoria de dependências sem vulnerabilidades conhecidas.
- Fluxo completo validado no navegador: formulário inválido, cadastro válido,
  persistência na listagem, busca e responsividade.

Evidências:

- `tests/clienteValidation.test.js`
- Scripts `test`, `build` e `check` no `package.json`.

## GitHub, commits e Kanban

- Histórico com commits granulares.
- Mensagens descrevendo a evolução do projeto.
- Branch `develop` documentada como branch de desenvolvimento.
- Kanban sugerido em `docs/kanban.md`.
- Scrum documentado em `docs/scrum.md`.
- Repositório pronto para ser publicado no GitHub.

Evidências:

- Branch `develop` publicada no GitHub.
- Branch `main` usada como versao estavel.
- Issues #1 a #10 usadas como tarefas da sprint.
- Pull requests de `develop` para `main`.
- Documentação em `README.md`, `docs/kanban.md`, `docs/scrum.md` e `docs/branches.md`.
