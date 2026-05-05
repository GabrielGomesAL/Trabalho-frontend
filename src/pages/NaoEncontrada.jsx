import { Link } from "react-router-dom";

export default function NaoEncontrada() {
  return (
    <section className="page-section">
      <span className="eyebrow">Erro 404</span>
      <h1>Pagina nao encontrada</h1>
      <p>A rota acessada nao existe nesta aplicacao.</p>
      <Link className="primary-action" to="/">
        Voltar ao inicio
      </Link>
    </section>
  );
}
