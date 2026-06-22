import {
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  RotateCcw,
  Search,
  UsersRound,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ClienteRow from "../components/clientes/ClienteRow.jsx";
import ConfirmarExclusaoModal from "../components/clientes/ConfirmarExclusaoModal.jsx";
import EditarClienteModal from "../components/clientes/EditarClienteModal.jsx";
import { OPCOES_PRIORIDADE } from "../constants/clienteOptions.js";
import { useClientes } from "../context/ClientesContext.jsx";

const opcoesOrigem = ["Todas", "Cadastro local", "Base integrada"];
const opcoesPrioridade = ["Todas", ...OPCOES_PRIORIDADE];

function normalizarTexto(valor) {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function formatarHorario(data) {
  return data
    ? new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(data)
    : "";
}

export default function Listagem() {
  const {
    carregandoApi,
    clientes,
    editarCliente,
    erroApi,
    excluirCliente,
    recarregarClientesApi,
    totalApi,
    totalCadastrados,
    ultimaAtualizacao,
  } = useClientes();
  const [busca, setBusca] = useState("");
  const [origem, setOrigem] = useState("Todas");
  const [prioridade, setPrioridade] = useState("Todas");
  const [clienteEmEdicao, setClienteEmEdicao] = useState(null);
  const [clienteParaExcluir, setClienteParaExcluir] = useState(null);
  const [feedbackAcao, setFeedbackAcao] = useState("");

  const clientesFiltrados = useMemo(() => {
    const termo = normalizarTexto(busca.trim());

    return clientes.filter((cliente) => {
      const combinaBusca =
        !termo ||
        normalizarTexto(cliente.nome).includes(termo) ||
        normalizarTexto(cliente.email).includes(termo) ||
        normalizarTexto(cliente.empresa).includes(termo) ||
        normalizarTexto(cliente.cidade).includes(termo);
      const combinaOrigem = origem === "Todas" || cliente.origem === origem;
      const combinaPrioridade =
        prioridade === "Todas" || cliente.prioridade === prioridade;

      return combinaBusca && combinaOrigem && combinaPrioridade;
    });
  }, [busca, clientes, origem, prioridade]);

  const filtrosAtivos = Boolean(
    busca || origem !== "Todas" || prioridade !== "Todas",
  );

  function limparFiltros() {
    setBusca("");
    setOrigem("Todas");
    setPrioridade("Todas");
  }

  const abrirEdicao = useCallback((cliente) => {
    setFeedbackAcao("");
    setClienteEmEdicao(cliente);
  }, []);

  const fecharEdicao = useCallback(() => {
    setClienteEmEdicao(null);
  }, []);

  const salvarEdicao = useCallback(
    (id, dadosAtualizados) => {
      editarCliente(id, dadosAtualizados);
      setClienteEmEdicao(null);
      setFeedbackAcao(`Cliente ${dadosAtualizados.nome} atualizado com sucesso.`);
    },
    [editarCliente],
  );

  const abrirExclusao = useCallback((cliente) => {
    setFeedbackAcao("");
    setClienteParaExcluir(cliente);
  }, []);

  const fecharExclusao = useCallback(() => {
    setClienteParaExcluir(null);
  }, []);

  const confirmarExclusao = useCallback(
    (cliente) => {
      excluirCliente(cliente.id);
      setClienteParaExcluir(null);
      setFeedbackAcao(`Cliente ${cliente.nome} excluído com sucesso.`);
    },
    [excluirCliente],
  );

  return (
    <section
      className="page-section listing-page"
      aria-labelledby="titulo-listagem"
    >
      <div className="listing-header">
        <div className="section-heading">
          <h1 id="titulo-listagem">Sua base de clientes</h1>
          <p>
            Consulte cadastros locais e contatos integrados em uma única visão.
          </p>
        </div>

        <dl className="stats-panel" aria-label="Resumo da listagem">
          <div>
            <dt>Total</dt>
            <dd>{clientes.length}</dd>
          </div>
          <div>
            <dt>Locais</dt>
            <dd>{totalCadastrados}</dd>
          </div>
          <div>
            <dt>Integrados</dt>
            <dd>{totalApi}</dd>
          </div>
        </dl>
      </div>

      <div className="filters-bar" aria-label="Filtros da listagem">
        <label className="search-field">
          <span>Buscar clientes</span>
          <div>
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              placeholder="Buscar por nome, e-mail, empresa ou cidade"
            />
          </div>
        </label>

        <label>
          Origem
          <select
            value={origem}
            onChange={(evento) => setOrigem(evento.target.value)}
          >
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

        <button
          type="button"
          onClick={recarregarClientesApi}
          disabled={carregandoApi}
        >
          <RefreshCw
            className={carregandoApi ? "icon-spin" : undefined}
            size={18}
            aria-hidden="true"
          />
          <span>Atualizar base</span>
        </button>
      </div>

      {carregandoApi ? (
        <div className="status-banner" role="status">
          <RefreshCw className="icon-spin" size={18} aria-hidden="true" />
          Carregando contatos integrados...
        </div>
      ) : null}

      {erroApi ? (
        <div className="status-banner status-error" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{erroApi}</span>
          <button type="button" onClick={recarregarClientesApi}>
            Tentar novamente
          </button>
        </div>
      ) : null}

      {!carregandoApi && !erroApi && ultimaAtualizacao ? (
        <div className="status-banner status-success" role="status">
          <CheckCircle2 size={18} aria-hidden="true" />
          Base atualizada com sucesso às {formatarHorario(ultimaAtualizacao)}.
        </div>
      ) : null}

      {feedbackAcao ? (
        <div className="status-banner status-success action-feedback" role="status">
          <CheckCircle2 size={18} aria-hidden="true" />
          {feedbackAcao}
        </div>
      ) : null}

      {clientesFiltrados.length > 0 ? (
        <div className="results-region" aria-live="polite">
          <div className="results-heading">
            <strong>
              {clientesFiltrados.length}{" "}
              {clientesFiltrados.length === 1
                ? "cliente encontrado"
                : "clientes encontrados"}
            </strong>
            {filtrosAtivos ? (
              <button type="button" onClick={limparFiltros}>
                <RotateCcw size={15} aria-hidden="true" /> Limpar filtros
              </button>
            ) : null}
          </div>

          <div className="table-scroll">
            <table className="clients-table">
              <caption className="sr-only">
                Clientes cadastrados e integrados
              </caption>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Empresa / cidade</th>
                  <th scope="col">Interesse</th>
                  <th scope="col">Origem</th>
                  <th scope="col">Prioridade</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map((cliente) => (
                  <ClienteRow
                    key={cliente.id}
                    cliente={cliente}
                    onEditar={abrirEdicao}
                    onExcluir={abrirExclusao}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <UsersRound size={34} aria-hidden="true" />
          <h2>Nenhum cliente encontrado</h2>
          <p>
            {filtrosAtivos
              ? "Ajuste os filtros ou tente buscar por outro termo."
              : "Cadastre um novo cliente para começar sua base."}
          </p>
          {filtrosAtivos ? (
            <button
              className="secondary-button"
              type="button"
              onClick={limparFiltros}
            >
              Limpar filtros
            </button>
          ) : (
            <Link className="primary-action" to="/cadastro">
              Novo cadastro
            </Link>
          )}
        </div>
      )}

      {clienteEmEdicao ? (
        <EditarClienteModal
          cliente={clienteEmEdicao}
          onClose={fecharEdicao}
          onSave={salvarEdicao}
        />
      ) : null}

      {clienteParaExcluir ? (
        <ConfirmarExclusaoModal
          cliente={clienteParaExcluir}
          onClose={fecharExclusao}
          onConfirm={confirmarExclusao}
        />
      ) : null}
    </section>
  );
}
