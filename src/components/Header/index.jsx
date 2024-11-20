import "./style.css";
import notificacaoIcon from "../../assets/HomeIcons/notificacao.svg";

export default function Header() {
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
            <a href="">
              <img src={notificacaoIcon} alt="" />
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
