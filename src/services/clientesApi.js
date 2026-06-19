const CLIENTES_URL = "https://jsonplaceholder.typicode.com/users";
const TEMPO_LIMITE_MS = 8000;

function normalizarClienteApi(usuario) {
  return {
    id: `api-${usuario.id}`,
    origem: "Base integrada",
    criadoEm: null,
    nome: usuario.name,
    email: usuario.email.toLowerCase(),
    telefone: usuario.phone,
    empresa: usuario.company?.name ?? "Empresa não informada",
    cidade: usuario.address?.city ?? "Cidade não informada",
    interesse: "Relacionamento comercial",
    prioridade: "Média",
    observacoes: usuario.website
      ? `Contato importado da base integrada. Site: ${usuario.website}`
      : "Contato importado da base integrada.",
  };
}

export async function buscarClientesApi({ signal } = {}) {
  const controlador = new AbortController();
  const cancelarPorTempo = setTimeout(
    () => controlador.abort(),
    TEMPO_LIMITE_MS,
  );
  const cancelarPorSinalExterno = () => controlador.abort();

  signal?.addEventListener("abort", cancelarPorSinalExterno, { once: true });

  try {
    const resposta = await fetch(CLIENTES_URL, {
      headers: { Accept: "application/json" },
      signal: controlador.signal,
    });

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar os contatos integrados.");
    }

    const usuarios = await resposta.json();

    if (!Array.isArray(usuarios)) {
      throw new Error("A API retornou dados em um formato inesperado.");
    }

    return usuarios.map(normalizarClienteApi);
  } catch (erro) {
    if (erro.name === "AbortError" && !signal?.aborted) {
      throw new Error("A API demorou para responder. Tente novamente.");
    }

    if (erro instanceof TypeError) {
      throw new Error("Não foi possível conectar à API. Tente novamente.");
    }

    throw erro;
  } finally {
    clearTimeout(cancelarPorTempo);
    signal?.removeEventListener("abort", cancelarPorSinalExterno);
  }
}
