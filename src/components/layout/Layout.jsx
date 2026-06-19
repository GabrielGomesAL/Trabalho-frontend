import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo
      </a>
      <Header />
      <main className="page-container" id="conteudo-principal">
        <Outlet />
      </main>
      <footer className="site-footer">
        <span>Nexo Clientes</span>
        <span>Projeto acadêmico em React</span>
      </footer>
    </div>
  );
}
