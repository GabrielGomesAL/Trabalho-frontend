# Trabalho Frontend - Gestao de Clientes

Aplicacao web em React desenvolvida para simular um fluxo real de frontend com
navegacao, formulario validado, listagem dinamica, estado compartilhado e
consumo de API REST.

## Funcionalidades

- Menu de navegacao com as paginas Inicio, Cadastro e Listagem usando React Router.
- Formulario controlado com `onChange`, `onBlur`, `onSubmit` e `preventDefault()`.
- Validacao de nome, e-mail, telefone, empresa, cidade, interesse e observacoes.
- Estado compartilhado com Context API para refletir cadastros na listagem.
- Persistencia local dos cadastros no `localStorage`.
- Consumo da API REST `https://jsonplaceholder.typicode.com/users`.
- Filtros por texto, origem dos dados e prioridade.
- CSS externo com layout responsivo para desktop e mobile.

## Tecnologias

- React
- Vite
- React Router DOM
- Context API
- Fetch API
- CSS externo
- Lucide React

## Como executar

```bash
npm install
npm run dev
```

Depois acesse o endereco mostrado no terminal, normalmente:

```bash
http://localhost:5173
```

Para validar a versao de producao:

```bash
npm run build
npm run preview
```

## Estrutura do projeto

```text
src/
  components/
    clientes/
    forms/
    layout/
  context/
  pages/
  services/
  styles/
  utils/
```

## Organizacao para entrega

- Commits separados por etapa de desenvolvimento.
- Tarefas de Kanban sugeridas em `docs/kanban.md`.
- Organizacao Scrum documentada em `docs/scrum.md`.
- Checklist da rubrica em `docs/rubrica.md`.

## Rotas

- `/` - Inicio com resumo do projeto e indicadores.
- `/cadastro` - Formulario para cadastrar novo cliente.
- `/listagem` - Lista dados da API REST e cadastros locais.
