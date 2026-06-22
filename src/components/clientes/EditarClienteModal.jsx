import { Save } from "lucide-react";
import { useRef, useState } from "react";
import { OPCOES_INTERESSE, OPCOES_PRIORIDADE } from "../../constants/clienteOptions.js";
import {
  formatarTelefone,
  validarCampo,
  validarCliente,
} from "../../utils/clienteValidation.js";
import Modal from "../common/Modal.jsx";
import FormField from "../forms/FormField.jsx";

function obterValoresIniciais(cliente) {
  return {
    nome: cliente.nome,
    email: cliente.email,
    telefone: cliente.telefone,
    empresa: cliente.empresa,
    cidade: cliente.cidade,
    interesse: cliente.interesse,
    prioridade: cliente.prioridade,
    observacoes: cliente.observacoes ?? "",
  };
}

export default function EditarClienteModal({ cliente, onClose, onSave }) {
  const formularioRef = useRef(null);
  const [formulario, setFormulario] = useState(() =>
    obterValoresIniciais(cliente),
  );
  const [erros, setErros] = useState({});
  const [camposVisitados, setCamposVisitados] = useState({});

  function atualizarCampo(evento) {
    const { name, value } = evento.target;
    const valorTratado = name === "telefone" ? formatarTelefone(value) : value;
    const novosValores = { ...formulario, [name]: valorTratado };

    setFormulario(novosValores);

    if (camposVisitados[name] || erros[name]) {
      setErros((errosAtuais) => ({
        ...errosAtuais,
        [name]: validarCampo(name, novosValores),
      }));
    }
  }

  function marcarCampoVisitado(evento) {
    const { name } = evento.target;
    setCamposVisitados((campos) => ({ ...campos, [name]: true }));
    setErros((errosAtuais) => ({
      ...errosAtuais,
      [name]: validarCampo(name, formulario),
    }));
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    const errosEncontrados = validarCliente(formulario);

    setErros(errosEncontrados);

    if (Object.keys(errosEncontrados).length > 0) {
      requestAnimationFrame(() => {
        formularioRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    onSave(cliente.id, {
      ...formulario,
      nome: formulario.nome.trim(),
      email: formulario.email.trim().toLowerCase(),
      empresa: formulario.empresa.trim(),
      cidade: formulario.cidade.trim(),
      observacoes: formulario.observacoes.trim(),
    });
  }

  return (
    <Modal
      title={`Editar ${cliente.nome}`}
      titleId="titulo-editar-cliente"
      descricaoId="descricao-editar-cliente"
      onClose={onClose}
    >
      <p id="descricao-editar-cliente" className="modal-description">
        Atualize os dados necessários. As alterações ficam salvas neste navegador.
      </p>

      <form ref={formularioRef} className="modal-form" noValidate onSubmit={enviarFormulario}>
        <div className="form-grid modal-form-grid">
          <FormField id="editar-nome" label="Nome completo" error={erros.nome} required>
            <input
              data-autofocus
              id="editar-nome"
              name="nome"
              type="text"
              value={formulario.nome}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
              autoComplete="name"
            />
          </FormField>

          <FormField id="editar-email" label="E-mail" error={erros.email} required>
            <input
              id="editar-email"
              name="email"
              type="email"
              value={formulario.email}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
              autoComplete="email"
            />
          </FormField>

          <FormField id="editar-telefone" label="Telefone" error={erros.telefone} required>
            <input
              id="editar-telefone"
              name="telefone"
              type="tel"
              value={formulario.telefone}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
              autoComplete="tel"
              inputMode="tel"
            />
          </FormField>

          <FormField id="editar-empresa" label="Empresa ou projeto" error={erros.empresa} required>
            <input
              id="editar-empresa"
              name="empresa"
              type="text"
              value={formulario.empresa}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
              autoComplete="organization"
            />
          </FormField>

          <FormField id="editar-cidade" label="Cidade" error={erros.cidade} required>
            <input
              id="editar-cidade"
              name="cidade"
              type="text"
              value={formulario.cidade}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
              autoComplete="address-level2"
            />
          </FormField>

          <FormField id="editar-interesse" label="Área de interesse" error={erros.interesse} required>
            <select
              id="editar-interesse"
              name="interesse"
              value={formulario.interesse}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
            >
              <option value="">Selecione uma opção</option>
              {OPCOES_INTERESSE.map((opcao) => (
                <option key={opcao} value={opcao}>{opcao}</option>
              ))}
            </select>
          </FormField>
        </div>

        <fieldset className="priority-fieldset modal-priority">
          <legend>Prioridade de atendimento</legend>
          <div className="priority-options">
            {OPCOES_PRIORIDADE.map((opcao) => (
              <label key={opcao} className="radio-card">
                <input
                  type="radio"
                  name="prioridade"
                  value={opcao}
                  checked={formulario.prioridade === opcao}
                  onChange={atualizarCampo}
                />
                <span>{opcao}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <FormField
          id="editar-observacoes"
          label="Observações"
          error={erros.observacoes}
          hint={`${formulario.observacoes.length}/180 caracteres`}
        >
          <textarea
            id="editar-observacoes"
            name="observacoes"
            rows="3"
            maxLength="180"
            value={formulario.observacoes}
            onBlur={marcarCampoVisitado}
            onChange={atualizarCampo}
          />
        </FormField>

        <div className="modal-actions">
          <button className="secondary-button" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="submit-button" type="submit">
            <Save size={18} aria-hidden="true" /> Salvar alterações
          </button>
        </div>
      </form>
    </Modal>
  );
}
