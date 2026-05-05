import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { buscarClientesApi } from "../services/clientesApi.js";

const ClientesContext = createContext(null);
const STORAGE_KEY = "gestao-clientes-cadastros";

function carregarClientesSalvos() {
  try {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
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

  const carregarClientesApi = useCallback(async () => {
    setStatusApi("carregando");
    setErroApi("");

    try {
      const clientes = await buscarClientesApi();
      setClientesApi(clientes);
      setStatusApi("sucesso");
    } catch (erro) {
      setClientesApi([]);
      setStatusApi("erro");
      setErroApi(erro.message);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clientesCadastrados));
  }, [clientesCadastrados]);

  useEffect(() => {
    carregarClientesApi();
  }, [carregarClientesApi]);

  function adicionarCliente(dadosCliente) {
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
  }

  const valorContexto = useMemo(
    () => ({
      clientes: [...clientesCadastrados, ...clientesApi],
      clientesCadastrados,
      clientesApi,
      carregandoApi: statusApi === "carregando",
      erroApi,
      recarregarClientesApi: carregarClientesApi,
      totalCadastrados: clientesCadastrados.length,
      totalApi: clientesApi.length,
      adicionarCliente,
    }),
    [carregarClientesApi, clientesApi, clientesCadastrados, erroApi, statusApi],
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
