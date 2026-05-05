import {
  Building2,
  CalendarPlus,
  Mail,
  MapPin,
  Phone,
  Star,
  Tag,
} from "lucide-react";

function formatarData(dataIso) {
  if (!dataIso) {
    return "Importado da API";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dataIso));
}

export default function ClienteCard({ cliente }) {
  return (
    <article className="client-card">
      <div className="client-card-header">
        <div>
          <span className="source-badge">{cliente.origem}</span>
          <h2>{cliente.nome}</h2>
        </div>
        <span className={`priority-badge priority-${cliente.prioridade.toLowerCase()}`}>
          <Star size={15} aria-hidden="true" />
          {cliente.prioridade}
        </span>
      </div>

      <div className="client-details">
        <span>
          <Mail size={16} aria-hidden="true" />
          {cliente.email}
        </span>
        <span>
          <Phone size={16} aria-hidden="true" />
          {cliente.telefone}
        </span>
        <span>
          <Building2 size={16} aria-hidden="true" />
          {cliente.empresa}
        </span>
        <span>
          <MapPin size={16} aria-hidden="true" />
          {cliente.cidade}
        </span>
      </div>

      <div className="interest-row">
        <span>
          <Tag size={16} aria-hidden="true" />
          {cliente.interesse}
        </span>
        <span>
          <CalendarPlus size={16} aria-hidden="true" />
          {formatarData(cliente.criadoEm)}
        </span>
      </div>

      {cliente.observacoes ? (
        <p className="client-note">{cliente.observacoes}</p>
      ) : null}
    </article>
  );
}
