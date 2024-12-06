import { useState } from "react";
import "./style.css";
import notificacaoIcon from "../../assets/HomeIcons/notificacao.svg";
import logoutIcon from "../../assets/HomeIcons/logout.svg";
import NotificationBar from "../../components/NotificationBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <nav className="nav-menu">
          <a href="/home" className="logo-link">
            <div className="logo-container central-item">
              <img className="logo" src="/logo2.png" alt="argus" />
              <h1 className="logo-name">ARGUS</h1>
            </div>
          </a>
          <div className="icons">
            <button onClick={toggleMenu} className="notification-button">
              <img src={notificacaoIcon} alt="Notificações" />
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                window.location.href = "/login";
              }}
              className="logout-button"
            >
              <img src={logoutIcon} alt="Logout" />
            </button>
          </div>
        </nav>
      </header>

      {/* Menu lateral */}
      <aside className={`notification-menu ${isMenuOpen ? "open" : ""}`}>
        <NotificationBar />
      </aside>

      {/* Background escurecido ao abrir o menu */}
      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </>
  );
}
