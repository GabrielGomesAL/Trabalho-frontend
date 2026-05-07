# Estrategia de branches

## Branch principal de desenvolvimento

A branch usada para concentrar os commits de desenvolvimento do projeto e:

```text
develop
```

Ela contem o historico progressivo do trabalho, com commits separados por etapa:

- configuracao inicial do React;
- navegacao entre paginas;
- formulario controlado com validacao;
- estado compartilhado;
- integracao com API REST;
- listagem dinamica;
- documentacao;
- validacao final da entrega.

## Branch estavel

A branch `main` representa a versao estavel publicada no repositorio.

## Fluxo usado

1. As tarefas foram organizadas em issues e documentos de Kanban/Scrum.
2. A implementacao foi feita em commits granulares.
3. A branch `develop` concentra o historico de desenvolvimento.
4. O projeto foi validado com build de producao antes da entrega.
