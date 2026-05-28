# Kanban do projeto

Use estas tarefas no GitHub Projects. As issues correspondentes ja foram
criadas no repositorio. O quadro deve usar as colunas:
`Backlog`, `Em desenvolvimento`, `Revisao` e `Concluido`.

## Fluxo do quadro

| Coluna | Objetivo |
| --- | --- |
| Backlog | Guardar requisitos levantados a partir da rubrica. |
| Em desenvolvimento | Concentrar tarefas sendo implementadas na branch `develop`. |
| Revisao | Validar build, interface, API, responsividade e documentacao. |
| Concluido | Reunir as tarefas finalizadas e revisadas. |

## Issues do Kanban

| Issue | Tarefa | Status final | Evidencia principal |
| --- | --- | --- | --- |
| #1 | Configurar base do projeto React | Concluido | `package.json`, `vite.config.js`, `src/main.jsx` |
| #2 | Implementar navegacao entre paginas | Concluido | `src/App.jsx`, `src/components/layout/Header.jsx` |
| #3 | Criar formulario controlado com validacao | Concluido | `src/pages/Cadastro.jsx`, `src/utils/clienteValidation.js` |
| #4 | Implementar estado compartilhado entre paginas | Concluido | `src/context/ClientesContext.jsx` |
| #5 | Integrar API REST e normalizar dados | Concluido | `src/services/clientesApi.js` |
| #6 | Criar listagem dinamica com filtros | Concluido | `src/pages/Listagem.jsx`, `src/components/clientes/ClienteCard.jsx` |
| #7 | Aplicar CSS externo e responsividade | Concluido | `src/styles/global.css` |
| #8 | Documentar projeto, rubrica e Kanban | Concluido | `README.md`, `docs/kanban.md`, `docs/rubrica.md` |
| #9 | Validar build e preparar entrega final | Concluido | Build de producao e historico de commits |
| #10 | Sprint de desenvolvimento do trabalho frontend | Concluido | `docs/scrum.md`, `docs/branches.md` |

## Concluido

### Configurar projeto React

- Criar estrutura base com Vite.
- Adicionar scripts `dev`, `build` e `preview`.
- Configurar entrada da aplicacao em `src/main.jsx`.

### Criar navegacao principal

- Implementar menu com Inicio, Cadastro e Listagem.
- Configurar rotas com React Router.
- Adicionar layout reutilizavel para todas as paginas.

### Implementar formulario controlado

- Controlar todos os campos com estado.
- Validar campos obrigatorios e formatos.
- Tratar `onChange`, `onBlur`, `onSubmit` e `preventDefault()`.

### Implementar estado compartilhado

- Criar `ClientesContext`.
- Adicionar novo cliente no estado global.
- Refletir dados cadastrados na pagina de listagem.
- Salvar cadastros locais no `localStorage`.

### Integrar API REST

- Consumir dados de `jsonplaceholder.typicode.com/users`.
- Normalizar dados externos para o formato usado na interface.
- Tratar carregamento e erro da requisicao.

### Criar listagem dinamica

- Renderizar multiplos clientes com `map`.
- Exibir dados locais e dados da API.
- Adicionar filtros por busca, origem e prioridade.

### Aplicar estilizacao responsiva

- Criar CSS externo.
- Organizar layout para desktop e mobile.
- Ajustar cards, filtros, formulario e navegacao.

### Documentar entrega

- Escrever instrucoes de execucao.
- Mapear requisitos da rubrica.
- Registrar sugestao de Kanban para o GitHub Projects.

## Revisao

### Validar entrega final

- Executar `npm run build`.
- Conferir responsividade no navegador.
- Revisar historico de commits antes de enviar o link.
