export function atualizarClienteLocal(clientes, id, dadosAtualizados) {
  return clientes.map((cliente) =>
    cliente.id === id
      ? {
          ...cliente,
          ...dadosAtualizados,
          id: cliente.id,
          origem: cliente.origem,
          criadoEm: cliente.criadoEm,
        }
      : cliente,
  );
}

export function removerClienteLocal(clientes, id) {
  return clientes.filter((cliente) => cliente.id !== id);
}
