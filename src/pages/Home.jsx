import {
  ArrowRight,
  Database,
  FileText,
  Link2,
  Search,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import WorkflowPreview from "../components/home/WorkflowPreview.jsx";
import { useClientes } from "../context/ClientesContext.jsx";

const highlights = [
  {
    icon: UserRoundPlus,
    title: "Cadastre sem complicação",
    text: "Registre contatos e prioridades com poucos passos.",
  },
  {
    icon: Search,
    title: "Encontre em segundos",
    text: "Busque por nome, e-mail, empresa, cidade ou origem.",
  },
  {
    icon: Database,
    title: "Dados sempre conectados",
    text: "Reúna cadastros locais e contatos integrados à API.",
  },
];

export default function Home() {
  const { clientes, totalApi, totalCadastrados } = useClientes();
  const clienteEmDestaque = clientes[0];

  return (
    <section className="home-page" aria-labelledby="titulo-inicio">
      <div className="hero-layout">
        <div className="hero-content">
          <h1 id="titulo-inicio">
            Clientes organizados, atendimento mais próximo.
          </h1>
          <p>
            Cadastre contatos, acompanhe prioridades e consulte sua base em um
            só lugar.
          </p>

          <div className="hero-actions">
            <Link className="primary-action" to="/cadastro">
              <UserRoundPlus size={19} aria-hidden="true" />
              <span>Cadastrar cliente</span>
            </Link>
            <Link className="secondary-action" to="/listagem">
              <span>Ver listagem</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <WorkflowPreview cliente={clienteEmDestaque} />
      </div>

      <dl className="summary-strip" aria-label="Resumo dos dados">
        <div>
          <span className="summary-icon" aria-hidden="true">
            <UsersRound size={28} />
          </span>
          <dt>Clientes na base</dt>
          <dd>{clientes.length}</dd>
        </div>
        <div>
          <span className="summary-icon" aria-hidden="true">
            <FileText size={27} />
          </span>
          <dt>Cadastros locais</dt>
          <dd>{totalCadastrados}</dd>
        </div>
        <div>
          <span className="summary-icon" aria-hidden="true">
            <Link2 size={28} />
          </span>
          <dt>Contatos integrados</dt>
          <dd>{totalApi}</dd>
        </div>
      </dl>

      <div
        className="capability-strip"
        aria-label="Recursos da gestão de clientes"
      >
        {highlights.map(({ icon: Icon, title, text }) => (
          <article className="capability-item" key={title}>
            <span className="capability-icon" aria-hidden="true">
              <Icon size={24} strokeWidth={1.8} />
            </span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
