# Kanban do projeto

As issues representam o backlog da sprint no GitHub Projects. O quadro usa as
colunas `Backlog`, `Em desenvolvimento`, `Revisão` e `Concluído`.

## Fluxo

| Coluna             | Objetivo                                                 |
| ------------------ | -------------------------------------------------------- |
| Backlog            | Reunir requisitos levantados a partir da rubrica.        |
| Em desenvolvimento | Concentrar tarefas em implementação na branch `develop`. |
| Revisão            | Validar testes, build, API, interface e responsividade.  |
| Concluído          | Reunir tarefas finalizadas e revisadas.                  |

## Issues

| Issue | Tarefa                                         | Status final | Evidência principal                                                |
| ----- | ---------------------------------------------- | ------------ | ------------------------------------------------------------------ |
| #1    | Configurar base do projeto React               | Concluído    | `package.json`, `vite.config.js`, `src/main.jsx`                   |
| #2    | Implementar navegação entre páginas            | Concluído    | `src/App.jsx`, `src/components/layout/Header.jsx`                  |
| #3    | Criar formulário controlado com validação      | Concluído    | `src/pages/Cadastro.jsx`, `src/utils/clienteValidation.js`         |
| #4    | Implementar estado compartilhado entre páginas | Concluído    | `src/context/ClientesContext.jsx`                                  |
| #5    | Integrar e normalizar dados da API REST        | Concluído    | `src/services/clientesApi.js`                                      |
| #6    | Criar listagem dinâmica e filtros              | Concluído    | `src/pages/Listagem.jsx`, `src/components/clientes/ClienteRow.jsx` |
| #7    | Aplicar CSS externo e responsividade           | Concluído    | `src/styles/global.css`                                            |
| #8    | Documentar projeto, rubrica e Kanban           | Concluído    | `README.md`, pasta `docs`                                          |
| #9    | Validar e preparar a entrega final             | Concluído    | Testes, build e auditoria                                          |
| #10   | Executar a sprint do trabalho frontend         | Concluído    | `docs/scrum.md`, `docs/branches.md`                                |
| #15   | Editar e excluir clientes locais               | Concluído    | Modais, Context API, persistência e testes                         |

## Definition of Done do quadro

- Funcionalidade implementada e revisada.
- Requisito ligado a uma evidência no código.
- Fluxo principal testado no navegador.
- Testes automatizados e build executados sem erro.
- Documentação atualizada.
