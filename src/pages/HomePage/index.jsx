import './style.css';
import Header from '../../components/Header';
import HomeButton from '../../components/HomeButton';
import HomeCardOutlined from '../../components/HomeCardOutlined';
import HomeCardFilled from '../../components/HomeCardFilled';
import HomeCardProfile from '../../components/HomeCardPerfil';
import { IoMdBuild } from "react-icons/io";
import { LuMessagesSquare } from "react-icons/lu";
import { FaBoxOpen, FaQuestionCircle, FaChartBar } from "react-icons/fa";
import { GiOpenGate } from "react-icons/gi";
import { RiMacbookLine } from "react-icons/ri";
import { MdEventAvailable } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { FcRules } from "react-icons/fc";
import { IoHomeSharp } from "react-icons/io5";
import moradora from "/moradora.png";
import comunicado1 from "/comunicado1.png";
import comunicado2 from "/comunicado2.png";
import comunicado3 from "/comunicado3.png";
import comunicado4 from "/comunicado4.png";
import HomeCardComunicados from '../../components/HomeCardComunicados';

export default function HomePage(){
    const service_items = [
        {Icon: <IoMdBuild/>, Title: "Manutenção"},
        {Icon: <LuMessagesSquare/>, Title: "Solicitações"},
        {Icon: <FaChartBar/>, Title: "Financeiro"},
        {Icon: <FaBoxOpen/>, Title: "Encomendas"},
        {Icon: <FaQuestionCircle/>, Title: "Dúvidas (FAQ)"},
        {Icon: <GiOpenGate/>, Title: "Portaria"},
        {Icon: <RiMacbookLine/>, Title: "Administração"},
        {Icon: <MdEventAvailable/>, Title: "Reservas"},
        {Icon: <GoLaw/>, Title: "Assembleia"},
        {Icon: <FcRules/>, Title: "Regras"},
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
                        <h1 className='title'>Inicio</h1>
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
                            <h1 className='title'>Comunicados</h1>
                            <input className='icon-button' type="button" value="Ver Todos" />
                        </div>
                        <div className='comunicados-content'>
                            {
                                comunicados_items.map((item, index) => (
                                    <HomeCardComunicados
                                        className="home-button"
                                        key={index}
                                        Icon={item.Img}
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
                        Icon={<IoHomeSharp />}
                        Title="Meu Apartamento"
                        Desc="Apt 407 | Blc 2"
                    />
                    <HomeCardFilled
                        Icon={<IoHomeSharp />}
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