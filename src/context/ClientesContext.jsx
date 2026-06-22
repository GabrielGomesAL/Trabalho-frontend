import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { buscarClientesApi } from "../services/clientesApi.js";
import {
  atualizarClienteLocal,
  removerClienteLocal,
} from "../utils/clientesState.js";

const ClientesContext = createContext(null);
const STORAGE_KEY = "gestao-clientes-cadastros";
const STORAGE_VERSION = 1;

function carregarClientesSalvos() {
  try {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados) {
      return [];
    }

    const armazenamento = JSON.parse(dados);

    if (Array.isArray(armazenamento)) {
      return armazenamento;
    }

    return armazenamento.version === STORAGE_VERSION &&
      Array.isArray(armazenamento.clientes)
      ? armazenamento.clientes
      : [];
  } catch {
    return [];
  }
}

function criarId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `cliente-${Date.now()}`;
}

export function ClientesProvider({ children }) {
  const [clientesCadastrados, setClientesCadastrados] = useState(
    carregarClientesSalvos,
  );
  const [clientesApi, setClientesApi] = useState([]);
  const [statusApi, setStatusApi] = useState("carregando");
  const [erroApi, setErroApi] = useState("");
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);
  const requisicaoAtual = useRef(null);

  const carregarClientesApi = useCallback(async () => {
    requisicaoAtual.current?.abort();
    const controlador = new AbortController();
    requisicaoAtual.current = controlador;
    setStatusApi("carregando");
    setErroApi("");

    try {
      const clientes = await buscarClientesApi({ signal: controlador.signal });

      if (requisicaoAtual.current !== controlador) {
        return;
      }

      setClientesApi(clientes);
      setStatusApi("sucesso");
      setUltimaAtualizacao(new Date());
    } catch (erro) {
      if (controlador.signal.aborted) {
        return;
      }

      setStatusApi("erro");
      setErroApi(erro.message);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          clientes: clientesCadastrados,
          version: STORAGE_VERSION,
        }),
      );
    } catch {
      // O estado em memória continua funcionando quando o armazenamento falha.
    }
  }, [clientesCadastrados]);

  useEffect(() => {
    carregarClientesApi();

    return () => requisicaoAtual.current?.abort();
  }, [carregarClientesApi]);

  const adicionarCliente = useCallback((dadosCliente) => {
    const novoCliente = {
      id: criarId(),
      origem: "Cadastro local",
      criadoEm: new Date().toISOString(),
      ...dadosCliente,
    };

    setClientesCadastrados((clientesAtuais) => [
      novoCliente,
      ...clientesAtuais,
    ]);

    return novoCliente;
  }, []);

  const editarCliente = useCallback((id, dadosCliente) => {
    setClientesCadastrados((clientesAtuais) =>
      atualizarClienteLocal(clientesAtuais, id, {
        ...dadosCliente,
        atualizadoEm: new Date().toISOString(),
      }),
    );
  }, []);

  const excluirCliente = useCallback((id) => {
    setClientesCadastrados((clientesAtuais) =>
      removerClienteLocal(clientesAtuais, id),
    );
  }, []);

  const clientes = useMemo(
    () => [...clientesCadastrados, ...clientesApi],
    [clientesApi, clientesCadastrados],
  );

  const valorContexto = useMemo(
    () => ({
      clientes,
      clientesCadastrados,
      clientesApi,
      carregandoApi: statusApi === "carregando",
      erroApi,
      recarregarClientesApi: carregarClientesApi,
      totalCadastrados: clientesCadastrados.length,
      totalApi: clientesApi.length,
      adicionarCliente,
      editarCliente,
      excluirCliente,
      ultimaAtualizacao,
    }),
    [
      adicionarCliente,
      carregarClientesApi,
      clientes,
      clientesApi,
      clientesCadastrados,
      erroApi,
      editarCliente,
      excluirCliente,
      statusApi,
      ultimaAtualizacao,
    ],
  );

  return (
    <ClientesContext.Provider value={valorContexto}>
      {children}
    </ClientesContext.Provider>
  );
}

export function useClientes() {
  const contexto = useContext(ClientesContext);

  if (!contexto) {
    throw new Error("useClientes deve ser usado dentro de ClientesProvider");
  }

  return contexto;
}
