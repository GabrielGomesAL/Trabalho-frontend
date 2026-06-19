import {
  Building2,
  Check,
  Link2,
  Mail,
  Star,
  UserRoundPlus,
} from "lucide-react";

const etapas = [
  { icon: UserRoundPlus, label: "Novo cadastro" },
  { icon: Star, label: "Prioridade definida" },
  { icon: Link2, label: "Contato integrado" },
];

function obterIniciais(nome = "") {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

export default function WorkflowPreview({ cliente }) {
  const contato = cliente ?? {
    nome: "Sua próxima conexão",
    email: "cliente@empresa.com",
    empresa: "Empresa do cliente",
    prioridade: "Média",
  };

  return (
    <div
      className="workflow-preview"
      aria-label="Fluxo de relacionamento com clientes"
    >
      <div className="workflow-steps" aria-hidden="true">
        {etapas.map(({ icon: Icon, label }) => (
          <div className="workflow-step" key={label}>
            <span>
              <Icon size={18} strokeWidth={1.9} />
            </span>
            {label}
          </div>
        ))}
      </div>

      <article className="contact-preview">
        <div className="contact-preview-heading">
          <span className="avatar avatar-large" aria-hidden="true">
            {obterIniciais(contato.nome) || "NC"}
          </span>
          <div>
            <h2>{contato.nome}</h2>
            <p>{contato.email}</p>
          </div>
        </div>

        <div className="contact-preview-status">
          <span>
            <Check size={14} aria-hidden="true" /> Dados conectados
          </span>
          <strong>{contato.prioridade}</strong>
        </div>

        <dl className="contact-preview-details">
          <div>
            <dt>
              <Building2 size={15} aria-hidden="true" /> Empresa
            </dt>
            <dd>{contato.empresa}</dd>
          </div>
          <div>
            <dt>
              <Mail size={15} aria-hidden="true" /> Origem
            </dt>
            <dd>{contato.origem ?? "Cadastro local"}</dd>
          </div>
        </dl>
      </article>
    </div>
  );
}
