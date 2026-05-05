import { CheckCircle2, RotateCcw, Save } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FormField from "../components/forms/FormField.jsx";
import { useClientes } from "../context/ClientesContext.jsx";
import {
  clienteInicial,
  formatarTelefone,
  validarCliente,
} from "../utils/clienteValidation.js";

const opcoesInteresse = [
  "Consultoria",
  "Suporte tecnico",
  "Desenvolvimento web",
  "Treinamento",
];

const opcoesPrioridade = ["Baixa", "Media", "Alta"];

export default function Cadastro() {
  const { adicionarCliente } = useClientes();
  const [formulario, setFormulario] = useState(clienteInicial);
  const [erros, setErros] = useState({});
  const [camposVisitados, setCamposVisitados] = useState({});
  const [clienteSalvo, setClienteSalvo] = useState(null);

  const totalCaracteres = formulario.observacoes.length;
  const formularioPossuiErros = useMemo(
    () => Object.keys(validarCliente(formulario)).length > 0,
    [formulario],
  );

  function atualizarCampo(evento) {
    const { name, value } = evento.target;
    const valorTratado = name === "telefone" ? formatarTelefone(value) : value;
    const novosValores = {
      ...formulario,
      [name]: valorTratado,
    };

    setFormulario(novosValores);
    setClienteSalvo(null);

    if (camposVisitados[name] || erros[name]) {
      setErros(validarCliente(novosValores));
    }
  }

  function marcarCampoVisitado(evento) {
    const { name } = evento.target;
    setCamposVisitados((campos) => ({ ...campos, [name]: true }));
    setErros(validarCliente(formulario));
  }

  function limparFormulario() {
    setFormulario(clienteInicial);
    setErros({});
    setCamposVisitados({});
    setClienteSalvo(null);
  }

  function enviarFormulario(evento) {
    evento.preventDefault();

    const errosEncontrados = validarCliente(formulario);
    setErros(errosEncontrados);
    setCamposVisitados(
      Object.keys(formulario).reduce(
        (campos, campo) => ({ ...campos, [campo]: true }),
        {},
      ),
    );

    if (Object.keys(errosEncontrados).length > 0) {
      return;
    }

    const novoCliente = adicionarCliente({
      ...formulario,
      nome: formulario.nome.trim(),
      email: formulario.email.trim().toLowerCase(),
      empresa: formulario.empresa.trim(),
      cidade: formulario.cidade.trim(),
      observacoes: formulario.observacoes.trim(),
    });

    setClienteSalvo(novoCliente);
    setFormulario(clienteInicial);
    setErros({});
    setCamposVisitados({});
  }

  return (
    <section className="page-section cadastro-page">
      <div className="section-heading">
        <span className="eyebrow">Cadastro</span>
        <h1>Novo cliente</h1>
        <p>
          Preencha os dados abaixo para adicionar um cliente ao estado
          compartilhado da aplicacao.
        </p>
      </div>

      {clienteSalvo ? (
        <div className="success-message" role="status">
          <CheckCircle2 size={20} aria-hidden="true" />
          <span>
            Cliente <strong>{clienteSalvo.nome}</strong> cadastrado com sucesso.
          </span>
          <Link to="/listagem">Ver na listagem</Link>
        </div>
      ) : null}

      <form className="client-form" noValidate onSubmit={enviarFormulario}>
        <div className="form-grid">
          <FormField id="nome" label="Nome completo" error={erros.nome}>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formulario.nome}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
              placeholder="Ex: Ana Souza"
              aria-invalid={Boolean(erros.nome)}
            />
          </FormField>

          <FormField id="email" label="E-mail" error={erros.email}>
            <input
              id="email"
              name="email"
              type="email"
              value={formulario.email}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
              placeholder="ana@email.com"
              aria-invalid={Boolean(erros.email)}
            />
          </FormField>

          <FormField id="telefone" label="Telefone" error={erros.telefone}>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              value={formulario.telefone}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
              placeholder="(11) 98888-7777"
              aria-invalid={Boolean(erros.telefone)}
            />
          </FormField>

          <FormField id="empresa" label="Empresa ou projeto" error={erros.empresa}>
            <input
              id="empresa"
              name="empresa"
              type="text"
              value={formulario.empresa}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
              placeholder="Ex: Escola Horizonte"
              aria-invalid={Boolean(erros.empresa)}
            />
          </FormField>

          <FormField id="cidade" label="Cidade" error={erros.cidade}>
            <input
              id="cidade"
              name="cidade"
              type="text"
              value={formulario.cidade}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
              placeholder="Ex: Sao Paulo"
              aria-invalid={Boolean(erros.cidade)}
            />
          </FormField>

          <FormField
            id="interesse"
            label="Area de interesse"
            error={erros.interesse}
          >
            <select
              id="interesse"
              name="interesse"
              value={formulario.interesse}
              onBlur={marcarCampoVisitado}
              onChange={atualizarCampo}
              aria-invalid={Boolean(erros.interesse)}
            >
              <option value="">Selecione uma opcao</option>
              {opcoesInteresse.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <fieldset className="priority-fieldset">
          <legend>Prioridade de atendimento</legend>
          <div className="priority-options">
            {opcoesPrioridade.map((opcao) => (
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
          id="observacoes"
          label="Observacoes"
          error={erros.observacoes}
          hint={`${totalCaracteres}/180 caracteres`}
        >
          <textarea
            id="observacoes"
            name="observacoes"
            rows="4"
            maxLength="180"
            value={formulario.observacoes}
            onBlur={marcarCampoVisitado}
            onChange={atualizarCampo}
            placeholder="Resumo do contato, necessidade principal ou observacao importante."
            aria-invalid={Boolean(erros.observacoes)}
          />
        </FormField>

        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={limparFormulario}>
            <RotateCcw size={18} aria-hidden="true" />
            <span>Limpar</span>
          </button>
          <button className="submit-button" type="submit">
            <Save size={18} aria-hidden="true" />
            <span>
              {formularioPossuiErros ? "Validar cadastro" : "Salvar cliente"}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
}
