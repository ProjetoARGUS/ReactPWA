import './style.css';
import notificacaoIcon from '../../assets/HomeIcons/notificacao.svg'

export default function Header(){
    return(
        <>
            <header>
                <nav className="nav-menu">
                    <div className="options">
                        <ul>
                            <li><a href=""><p>Inicio</p></a></li>
                            <li><a href=""><p>Mediação de Conflitos</p></a></li>
                            <li><a href=""><p>Perfil</p></a></li>
                        </ul>
                    </div>
                    <div className="spacer"></div>
                    <div className='logo-container central-item'>
                        <img className='logo' src="/logo2.png" alt="argus" />
                        <h1 className='logo-name'>ARGUS</h1>
                    </div>
                    <div className="spacer"></div>
                    <div className="icons">
                        <a href=""><img src={notificacaoIcon} alt="" /></a>
                    </div>
                </nav>
            </header>
        </>
    )
}