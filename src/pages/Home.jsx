import { ArrowRight, Database, FormInput, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { useClientes } from "../context/ClientesContext.jsx";

const highlights = [
  {
    icon: Route,
    title: "Navegacao",
    text: "Rotas com React Router para simular uma aplicacao real.",
  },
  {
    icon: FormInput,
    title: "Cadastro",
    text: "Formulario controlado com validacao e tratamento de eventos.",
  },
  {
    icon: Database,
    title: "API REST",
    text: "Dados externos consumidos e exibidos junto aos cadastros locais.",
  },
];

export default function Home() {
  const { clientes, totalApi, totalCadastrados } = useClientes();

  return (
    <section className="home-page">
      <div className="hero-content">
        <span className="eyebrow">Projeto Frontend</span>
        <h1>Aplicacao React para cadastro e listagem de clientes</h1>
        <p>
          Sistema web com navegacao, validacao de formulario, estado compartilhado
          entre paginas e integracao com API REST.
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
            vindos da API
          </span>
        </div>
      </div>

      <div className="highlight-grid" aria-label="Resumo dos requisitos">
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
