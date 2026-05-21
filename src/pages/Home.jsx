import { ArrowRight, ClipboardList, Database, FormInput } from "lucide-react";
import { Link } from "react-router-dom";
import { useClientes } from "../context/ClientesContext.jsx";

const highlights = [
  {
    icon: FormInput,
    title: "Novos cadastros",
    text: "Registre contatos, interesses e prioridades de atendimento.",
  },
  {
    icon: ClipboardList,
    title: "Consulta rapida",
    text: "Localize clientes por nome, empresa, cidade ou origem.",
  },
  {
    icon: Database,
    title: "Base integrada",
    text: "Acompanhe clientes cadastrados e contatos importados.",
  },
];

export default function Home() {
  const { clientes, totalApi, totalCadastrados } = useClientes();

  return (
    <section className="home-page">
      <div className="hero-content">
        <span className="eyebrow">Gestao comercial</span>
        <h1>Cadastro e listagem de clientes</h1>
        <p>
          Organize contatos, registre novos clientes e acompanhe as informacoes
          mais importantes em um so lugar.
        </p>
        <Link className="primary-action" to="/cadastro">
          <span>Novo cadastro</span>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>

        <div className="summary-strip" aria-label="Resumo dos dados">
          <span>
            <strong>{clientes.length}</strong>
            clientes no total
          </span>
          <span>
            <strong>{totalCadastrados}</strong>
            cadastrados localmente
          </span>
          <span>
            <strong>{totalApi}</strong>
            importados
          </span>
        </div>
      </div>

      <div className="highlight-grid" aria-label="Recursos da gestao de clientes">
        {highlights.map(({ icon: Icon, title, text }) => (
          <article className="feature-card" key={title}>
            <Icon size={22} aria-hidden="true" />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
