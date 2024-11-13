import './style.css';
import { IoIosNotifications } from "react-icons/io";

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
                        <a href=""><img className='foto-perfil' src="https://aguasdorio.com.br/wp-content/uploads/2024/03/Moradora-Maria-Ines-Frade-de-56-anos-foi-uma-das-pessoas-que-aproveitaram-esta-acao-1024x813.jpeg" alt="Perfil" /></a>
                        <a href=""><IoIosNotifications className='not' /></a>
                    </div>
                </nav>
            </header>
        </>
    )
}