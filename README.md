# Nexo Clientes

Aplicação web em React para cadastrar, consultar e organizar clientes. O
projeto simula um fluxo real de frontend com roteamento, formulário validado,
estado compartilhado, persistência local e integração com API REST.

## Funcionalidades

- Navegação entre **Início**, **Cadastro** e **Listagem** com React Router.
- Formulário totalmente controlado com validação por campo e no envio.
- Tratamento de `onChange`, `onBlur`, `onSubmit` e `preventDefault()`.
- Estado global com Context API e persistência versionada no `localStorage`.
- Novos cadastros refletidos imediatamente na listagem.
- Edição e exclusão de cadastros locais com validação e confirmação.
- Contatos vindos da API protegidos como dados somente leitura.
- Consumo da API REST [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).
- Tratamento visual de carregamento, sucesso, erro, timeout e nova tentativa.
- Busca dinâmica sem diferença entre letras acentuadas e não acentuadas.
- Filtros por origem e prioridade.
- Interface responsiva, acessível e estilizada em CSS externo.
- Testes automatizados das regras de validação e formatação.

## Tecnologias

- React 18
- Vite 8
- React Router DOM
- Context API
- Fetch API
- Lucide React
- CSS externo
- Node.js Test Runner

## Como executar

Requisito: Node.js 20.19 ou superior.

```bash
npm install
npm run dev
```

Acesse o endereço exibido no terminal, normalmente
`http://localhost:5173`.

## Validação do projeto

```bash
# Executa os testes automatizados
npm test

# Executa testes e build de produção
npm run check

# Verifica dependências conhecidas como vulneráveis
npm audit
```

## Estrutura

```text
src/
  assets/        # identidade visual
  components/    # componentes reutilizáveis por domínio
  context/       # estado global e persistência
  pages/         # páginas associadas às rotas
  services/      # integração e normalização da API REST
  styles/        # sistema visual e responsividade
  utils/         # validação e formatação
tests/           # testes automatizados
docs/            # Kanban, Scrum, branches e rubrica
```

## Rotas

| Rota        | Página   | Responsabilidade                                |
| ----------- | -------- | ----------------------------------------------- |
| `/`         | Início   | Apresentar os recursos e o resumo da base.      |
| `/cadastro` | Cadastro | Validar e registrar um novo cliente.            |
| `/listagem` | Listagem | Exibir, buscar e filtrar dados locais e da API. |

## Organização da entrega

- Commits progressivos e descritos por tipo (`feat`, `fix`, `docs`, `chore`).
- Branch `develop` para desenvolvimento e `main` para a versão estável.
- Issues #1 a #10 e #15 representando o backlog e a evolução da sprint.
- Fluxo Kanban documentado em [`docs/kanban.md`](docs/kanban.md).
- Scrum e Definition of Done em [`docs/scrum.md`](docs/scrum.md).
- Evidências da rubrica em [`docs/rubrica.md`](docs/rubrica.md).
