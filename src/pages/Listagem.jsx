import { AlertCircle, RefreshCw, Search, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ClienteCard from "../components/clientes/ClienteCard.jsx";
import { useClientes } from "../context/ClientesContext.jsx";

const opcoesOrigem = ["Todas", "Cadastro local", "API REST"];
const opcoesPrioridade = ["Todas", "Baixa", "Media", "Alta"];

export default function Listagem() {
  const {
    carregandoApi,
    clientes,
    erroApi,
    recarregarClientesApi,
    totalApi,
    totalCadastrados,
  } = useClientes();
  const [busca, setBusca] = useState("");
  const [origem, setOrigem] = useState("Todas");
  const [prioridade, setPrioridade] = useState("Todas");

  const clientesFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return clientes.filter((cliente) => {
      const combinaBusca =
        !termo ||
        cliente.nome.toLowerCase().includes(termo) ||
        cliente.email.toLowerCase().includes(termo) ||
        cliente.empresa.toLowerCase().includes(termo) ||
        cliente.cidade.toLowerCase().includes(termo);
      const combinaOrigem = origem === "Todas" || cliente.origem === origem;
      const combinaPrioridade =
        prioridade === "Todas" || cliente.prioridade === prioridade;

      return combinaBusca && combinaOrigem && combinaPrioridade;
    });
  }, [busca, clientes, origem, prioridade]);

  return (
    <section className="page-section listing-page">
      <div className="listing-header">
        <div className="section-heading">
          <span className="eyebrow">Listagem</span>
          <h1>Clientes cadastrados</h1>
          <p>
            Visualize os dados consumidos da API REST junto aos cadastros feitos
            no formulario.
          </p>
        </div>

        <div className="stats-panel" aria-label="Resumo da listagem">
          <span>
            <strong>{clientes.length}</strong>
            total
          </span>
          <span>
            <strong>{totalCadastrados}</strong>
            locais
          </span>
          <span>
            <strong>{totalApi}</strong>
            API
          </span>
        </div>
      </div>

      <div className="filters-bar" aria-label="Filtros da listagem">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            placeholder="Buscar por nome, e-mail, empresa ou cidade"
          />
        </label>

        <label>
          Origem
          <select value={origem} onChange={(evento) => setOrigem(evento.target.value)}>
            {opcoesOrigem.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </label>

        <label>
          Prioridade
          <select
            value={prioridade}
            onChange={(evento) => setPrioridade(evento.target.value)}
          >
            {opcoesPrioridade.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </label>

        <button type="button" onClick={recarregarClientesApi}>
          <RefreshCw size={18} aria-hidden="true" />
          <span>Atualizar API</span>
        </button>
      </div>

      {carregandoApi ? (
        <div className="status-banner">
          <RefreshCw size={18} aria-hidden="true" />
          Carregando clientes da API REST...
        </div>
      ) : null}

      {erroApi ? (
        <div className="status-banner status-error">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{erroApi}</span>
          <button type="button" onClick={recarregarClientesApi}>
            Tentar novamente
          </button>
        </div>
      ) : null}

      {clientesFiltrados.length > 0 ? (
        <div className="client-list" aria-live="polite">
          {clientesFiltrados.map((cliente) => (
            <ClienteCard key={cliente.id} cliente={cliente} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <UsersRound size={34} aria-hidden="true" />
          <h2>Nenhum cliente encontrado</h2>
          <p>Cadastre um novo cliente ou ajuste os filtros da listagem.</p>
          <Link className="primary-action" to="/cadastro">
            Novo cadastro
          </Link>
        </div>
      )}
    </section>
  );
}
