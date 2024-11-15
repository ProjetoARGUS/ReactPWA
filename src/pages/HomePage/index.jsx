import './style.css';
import Header from '../../components/Header';
import HomeButton from '../../components/HomeButton';
import HomeCardOutlined from '../../components/HomeCardOutlined';
import HomeCardFilled from '../../components/HomeCardFilled';
import HomeCardProfile from '../../components/HomeCardPerfil';

import moradora from "/moradora.png";
import inicioIcon from '../../assets/HomeIcons/inicio.svg';
import manutencaoIcon from '../../assets/HomeIcons/manutencao.svg';
import chatIcon from '../../assets/HomeIcons/chat.svg';
import financeiroIcon from '../../assets/HomeIcons/financeiro.svg';
import encomendasIcon from '../../assets/HomeIcons/encomendas.svg';
import faqIcon from '../../assets/HomeIcons/faq.svg';
import conflitosIcon from '../../assets/HomeIcons/conflitos.svg';
import perfilIcon from '../../assets/HomeIcons/perfil.svg';
import reservasIcon from '../../assets/HomeIcons/reservas.svg';
import assembleiaIcon from '../../assets/HomeIcons/assembleia.svg';
import regrasIcon from '../../assets/HomeIcons/regras.svg';
import comunicadosIcon from '../../assets/HomeIcons/comunicados.svg';
import apartamentoIcon from '../../assets/HomeIcons/apartamento.svg';
import condominioIcon from '../../assets/HomeIcons/condominio.svg';

import comunicado1 from "../../assets/ComunicadosImg/comunicado1.png";
import comunicado2 from "../../assets/ComunicadosImg/comunicado2.png";
import comunicado3 from "../../assets/ComunicadosImg/comunicado3.png";
import comunicado4 from "../../assets/ComunicadosImg/comunicado4.png";

import HomeCardComunicados from '../../components/HomeCardComunicados';

export default function HomePage(){
    const service_items = [
        {Icon: manutencaoIcon, Title: "Manutenção"},
        {Icon: chatIcon, Title: "Solicitações"},
        {Icon: financeiroIcon, Title: "Financeiro"},
        {Icon: encomendasIcon, Title: "Encomendas"},
        {Icon: faqIcon, Title: "Dúvidas (FAQ)"},
        {Icon: conflitosIcon, Title: "Conflitos"},
        {Icon: perfilIcon, Title: "Perfil"},
        {Icon: reservasIcon, Title: "Reservas"},
        {Icon: assembleiaIcon, Title: "Assembleia"},
        {Icon: regrasIcon, Title: "Regras"},
    ]

    const comunicados_items = [
        {Img: comunicado1, Title: "Quadra em Manutenção", Desc: "A quadra esportiva passará por manutenção no dia 11/10 e ficará temporariamente indisponível para uso."},
        {Img: comunicado2, Title: "Pintura dos blocos", Desc: "Aviso aos condôminos: A pintura dos blocos começará no dia 18/11. Pedimos a colaboração e compreensão de todos..."},
        {Img: comunicado3, Title: "Manuntenção na rua 03 ", Desc: "Aviso aos condôminos: A Rua 03 passará por manutenção no dia 25/11, podendo haver restrição de acesso temporária..."},
        {Img: comunicado4, Title: "interrupção Temporaria de água", Desc: "Aviso aos condôminos: Haverá interrupção temporária no abastecimento de água no dia 28/11 devido a manutenção..."},
    ]

    return (
        <>
            <Header />
            <section className="home-page">
                <main>
                    <section className="service-section">
                        <h1 className='title'><img src={inicioIcon} alt=""/> Inicio</h1>
                        <div className='service-content'>
                            {
                                service_items.map((item, index) => (
                                    <HomeButton
                                    className="home-button"
                                    key={index}
                                    Icon={item.Icon}
                                    Title={item.Title}
                                    />
                                ))
                            }
                        </div>
                    </section>
                    <section className="comunicados-section">
                        <div className='div-title'>
                            <h1 className='title'><img src={comunicadosIcon} alt="" /> Comunicados</h1>
                            <input className='icon-button' type="button" value="Ver Todos" />
                        </div>
                        <div className='comunicados-content'>
                            {
                                comunicados_items.map((item, index) => (
                                    <HomeCardComunicados
                                        className="home-button"
                                        key={index}
                                        Img={item.Img}
                                        Title={item.Title}
                                        Desc={item.Desc}
                                    />
                                ))
                            }
                        </div>
                    </section>
                </main>
                <section className='aside'>
                    <HomeCardOutlined
                        Icon={apartamentoIcon}
                        Title="Meu Apartamento"
                        Desc="Apt 407 | Blc 2"
                    />
                    <HomeCardFilled
                        Icon={condominioIcon}
                        Title="Meu Apartamento"
                        Desc="Apt 407 | Blc 2"
                    />
                    <HomeCardProfile
                        Img={moradora}
                        UserName="Neide da Silva"
                        Level="10"
                        XP="698"
                        CPF="085.391.474-26"
                        Cellphone="(81) 98856-0917"
                    />
                </section>
            </section>
        </>
    )
}