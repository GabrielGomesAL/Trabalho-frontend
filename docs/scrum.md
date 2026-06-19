# Scrum do projeto

## Objetivo da sprint

Entregar uma aplicação React executável localmente com navegação, formulário
validado, listagem dinâmica, estado compartilhado, integração REST e interface
responsiva.

## Product Backlog

- Configurar a base React com Vite.
- Implementar três páginas com roteamento.
- Criar formulário controlado e validado.
- Compartilhar e persistir o estado entre páginas.
- Consumir e normalizar dados de uma API REST.
- Renderizar a listagem com busca e filtros.
- Aplicar CSS externo, acessibilidade e responsividade.
- Documentar execução, Kanban, branches e rubrica.

## Sprint Backlog

As issues #1 a #10 representam as tarefas da sprint e correspondem às
evidências registradas em `docs/kanban.md`.

## Definition of Done

- A aplicação roda com `npm install` e `npm run dev`.
- As rotas Início, Cadastro e Listagem funcionam.
- O formulário bloqueia dados inválidos e confirma dados válidos.
- Um novo cadastro aparece imediatamente na listagem.
- A API REST possui carregamento, sucesso, erro, timeout e nova tentativa.
- Busca e filtros atualizam a interface dinamicamente.
- O layout funciona em desktop e mobile sem rolagem horizontal.
- `npm run check` e `npm audit` terminam sem erro.
- Commits e documentação refletem a evolução do projeto.

## Incremento entregue

O incremento final reúne cadastro, validação por campo, persistência local,
listagem responsiva, filtros, integração REST, estados de interface,
acessibilidade e documentação completa da entrega.
