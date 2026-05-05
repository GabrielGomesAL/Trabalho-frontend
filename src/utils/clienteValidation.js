export const clienteInicial = {
  nome: "",
  email: "",
  telefone: "",
  empresa: "",
  cidade: "",
  interesse: "",
  prioridade: "Media",
  observacoes: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}

export function formatarTelefone(valor) {
  const numeros = somenteNumeros(valor).slice(0, 11);

  if (numeros.length <= 2) {
    return numeros;
  }

  if (numeros.length <= 6) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }

  if (numeros.length <= 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

export function validarCliente(valores) {
  const erros = {};
  const telefoneLimpo = somenteNumeros(valores.telefone);

  if (valores.nome.trim().length < 3) {
    erros.nome = "Informe um nome com pelo menos 3 caracteres.";
  }

  if (!emailRegex.test(valores.email.trim())) {
    erros.email = "Informe um e-mail valido.";
  }

  if (telefoneLimpo.length < 10) {
    erros.telefone = "Informe um telefone com DDD.";
  }

  if (!valores.empresa.trim()) {
    erros.empresa = "Informe a empresa ou projeto do cliente.";
  }

  if (!valores.cidade.trim()) {
    erros.cidade = "Informe a cidade.";
  }

  if (!valores.interesse) {
    erros.interesse = "Selecione uma area de interesse.";
  }

  if (valores.observacoes.length > 180) {
    erros.observacoes = "Use no maximo 180 caracteres.";
  }

  return erros;
}
