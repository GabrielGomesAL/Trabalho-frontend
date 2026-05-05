import { createContext, useContext, useEffect, useMemo, useState } from "react";

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clientesCadastrados));
  }, [clientesCadastrados]);

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
      clientesCadastrados,
      totalCadastrados: clientesCadastrados.length,
      adicionarCliente,
    }),
    [clientesCadastrados],
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
