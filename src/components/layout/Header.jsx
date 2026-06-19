import { ClipboardList, House, UserPlus } from "lucide-react";
import { NavLink } from "react-router-dom";
import nexoLogo from "../../assets/nexo-logo.png";

const menuItems = [
  { to: "/", label: "Início", icon: House },
  { to: "/cadastro", label: "Cadastro", icon: UserPlus },
  { to: "/listagem", label: "Listagem", icon: ClipboardList },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/" aria-label="Nexo Clientes - Início">
          <span className="brand-mark" aria-hidden="true">
            <img src={nexoLogo} alt="" width="46" height="46" />
          </span>
          <span className="brand-copy">
            <strong>Nexo Clientes</strong>
            <span>Gestão de relacionamento</span>
          </span>
        </NavLink>

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
              <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
