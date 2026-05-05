const CLIENTES_URL = "https://jsonplaceholder.typicode.com/users";

function normalizarClienteApi(usuario) {
  return {
    id: `api-${usuario.id}`,
    origem: "API REST",
    criadoEm: null,
    nome: usuario.name,
    email: usuario.email.toLowerCase(),
    telefone: usuario.phone,
    empresa: usuario.company?.name ?? "Empresa nao informada",
    cidade: usuario.address?.city ?? "Cidade nao informada",
    interesse: "Relacionamento comercial",
    prioridade: "Media",
    observacoes: usuario.website
      ? `Contato importado da API. Site: ${usuario.website}`
      : "Contato importado da API.",
  };
}

export async function buscarClientesApi() {
  const resposta = await fetch(CLIENTES_URL);

  if (!resposta.ok) {
    throw new Error("Nao foi possivel carregar os clientes da API.");
  }

  const usuarios = await resposta.json();
  return usuarios.map(normalizarClienteApi);
}
