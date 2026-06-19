import { Link } from "react-router-dom";

export default function NaoEncontrada() {
  return (
    <section className="page-section not-found-page">
      <span className="error-code">404</span>
      <h1>Página não encontrada</h1>
      <p>A rota acessada não existe nesta aplicação.</p>
      <Link className="primary-action" to="/">
        Voltar ao início
      </Link>
    </section>
  );
}
