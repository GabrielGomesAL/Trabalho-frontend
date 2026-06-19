import assert from "node:assert/strict";
import test from "node:test";
import {
  clienteInicial,
  formatarTelefone,
  validarCliente,
} from "../src/utils/clienteValidation.js";

test("formata telefone fixo e celular com DDD", () => {
  assert.equal(formatarTelefone("11987654321"), "(11) 98765-4321");
  assert.equal(formatarTelefone("1134567890"), "(11) 3456-7890");
});

test("retorna erros para os campos obrigatórios vazios", () => {
  const erros = validarCliente(clienteInicial);

  assert.deepEqual(Object.keys(erros).sort(), [
    "cidade",
    "email",
    "empresa",
    "interesse",
    "nome",
    "telefone",
  ]);
});

test("aceita um cadastro válido", () => {
  const erros = validarCliente({
    nome: "Ana Souza",
    email: "ana@empresa.com",
    telefone: "(11) 98765-4321",
    empresa: "Nexo Soluções",
    cidade: "São Paulo",
    interesse: "Consultoria",
    prioridade: "Média",
    observacoes: "Primeiro contato realizado.",
  });

  assert.deepEqual(erros, {});
});

test("limita observações a 180 caracteres", () => {
  const erros = validarCliente({
    ...clienteInicial,
    observacoes: "a".repeat(181),
  });

  assert.equal(erros.observacoes, "Use no máximo 180 caracteres.");
});
