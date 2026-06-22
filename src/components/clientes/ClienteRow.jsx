import {
  Building2,
  Edit3,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Trash2,
} from "lucide-react";

function obterIniciais(nome) {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

function classePrioridade(prioridade) {
  return prioridade
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function ClienteRow({ cliente, onEditar, onExcluir }) {
  const cadastroLocal = cliente.origem === "Cadastro local";

  return (
    <tr>
      <td data-label="Cliente">
        <div className="client-identity">
          <span className="avatar" aria-hidden="true">
            {obterIniciais(cliente.nome)}
          </span>
          <div>
            <strong>{cliente.nome}</strong>
            <span>
              <Mail size={14} aria-hidden="true" /> {cliente.email}
            </span>
          </div>
        </div>
      </td>
      <td data-label="Empresa e cidade">
        <strong className="table-primary">
          <Building2 size={14} aria-hidden="true" /> {cliente.empresa}
        </strong>
        <span className="table-secondary">
          <MapPin size={14} aria-hidden="true" /> {cliente.cidade}
        </span>
      </td>
      <td data-label="Interesse">{cliente.interesse}</td>
      <td data-label="Origem">
        <span className="source-status">
          <span aria-hidden="true" />
          {cliente.origem}
        </span>
      </td>
      <td data-label="Prioridade">
        <span
          className={`priority-status priority-${classePrioridade(cliente.prioridade)}`}
        >
          <span aria-hidden="true" />
          {cliente.prioridade}
        </span>
      </td>
      <td data-label="Telefone">
        <span className="phone-value">
          <Phone size={14} aria-hidden="true" /> {cliente.telefone}
        </span>
      </td>
      <td data-label="Ações" className="actions-cell">
        {cadastroLocal ? (
          <div className="row-actions">
            <button
              className="row-action row-action-edit"
              type="button"
              onClick={() => onEditar(cliente)}
              aria-label={`Editar ${cliente.nome}`}
              title="Editar cliente"
            >
              <Edit3 size={16} aria-hidden="true" />
            </button>
            <button
              className="row-action row-action-delete"
              type="button"
              onClick={() => onExcluir(cliente)}
              aria-label={`Excluir ${cliente.nome}`}
              title="Excluir cliente"
            >
              <Trash2 size={16} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <span className="read-only-status" title="Dados fornecidos pela API">
            <LockKeyhole size={14} aria-hidden="true" />
            Somente leitura
          </span>
        )}
      </td>
    </tr>
  );
}
