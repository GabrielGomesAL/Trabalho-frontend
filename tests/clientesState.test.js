import assert from "node:assert/strict";
import test from "node:test";
import {
  atualizarClienteLocal,
  removerClienteLocal,
} from "../src/utils/clientesState.js";

const clientes = [
  {
    id: "cliente-1",
    nome: "Ana Souza",
    origem: "Cadastro local",
    criadoEm: "2026-06-01T12:00:00.000Z",
  },
  {
    id: "cliente-2",
    nome: "Bruno Lima",
    origem: "Cadastro local",
    criadoEm: "2026-06-02T12:00:00.000Z",
  },
];

test("atualiza apenas o cliente selecionado e preserva seus metadados", () => {
  const resultado = atualizarClienteLocal(clientes, "cliente-1", {
    id: "id-invalido",
    nome: "Ana Martins",
    origem: "Base integrada",
    criadoEm: "data-invalida",
    atualizadoEm: "2026-06-22T12:00:00.000Z",
  });

  assert.equal(resultado[0].nome, "Ana Martins");
  assert.equal(resultado[0].id, "cliente-1");
  assert.equal(resultado[0].origem, "Cadastro local");
  assert.equal(resultado[0].criadoEm, "2026-06-01T12:00:00.000Z");
  assert.equal(resultado[0].atualizadoEm, "2026-06-22T12:00:00.000Z");
  assert.strictEqual(resultado[1], clientes[1]);
});

test("remove somente o cliente selecionado", () => {
  const resultado = removerClienteLocal(clientes, "cliente-1");

  assert.deepEqual(resultado, [clientes[1]]);
  assert.equal(clientes.length, 2);
});
