import { NavLink } from "react-router-dom";
import { ClipboardList, Home, PlusCircle, UsersRound } from "lucide-react";

const menuItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/cadastro", label: "Cadastro", icon: PlusCircle },
  { to: "/listagem", label: "Listagem", icon: ClipboardList },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-icon" aria-hidden="true">
          <UsersRound size={22} />
        </span>
        <div>
          <strong>Gestao de Clientes</strong>
          <span>Frontend com React + API REST</span>
        </div>
      </div>

      <nav className="main-nav" aria-label="Menu principal">
        {menuItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
