import { useState } from 'react';
import './style.css';
import { FaSearch } from "react-icons/fa";

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
import comunicadosIcon from '../../assets/HomeIcons/comunicados_notification.svg';
import NotificationUnit from '../NotificationUnit';


export default function NotificationBar(){
    const [value, setValue] = useState('');
    const onChange = (event) => {
        setValue(event.target.value);
    };

    const eraseField = () =>{
        setValue('');
    };

    const addTask = () => {
        if(value.trim()){
            alert("Notificação Procurada!")
            eraseField();
        }
    };

    const onKeyDown = (event) =>{
        if (event.which ===  13){
            addTask();
        } else if(event.which === 27){
            eraseField();
        }
    };

    const notifications = [
        { id: 1, icon: reservasIcon, title: "Você reservou o Espaço Quadra", info: "Reserva realizada em 03/11/24", time: "19m" },
        { id: 2, icon: chatIcon, title: "Nova mensagem do Síndico", info: "Nicole, sobre o relato estou...", time: "1d" },
        { id: 3, icon: comunicadosIcon, title: "Comunicado da Quadra", info: "A partir do dia 08/11/24 a qua...", time: "1d" },
        { id: 4, icon: financeiroIcon, title: "Boleto disponível", info: "Seu boleto já está disponível...", time: "3d" },
        { id: 5, icon: encomendasIcon, title: "Nova encomenda", info: "Sua encomenda chegou e já...", time: "5d" },
        { id: 6, icon: assembleiaIcon, title: "A assembleia vai começar", info: "Entre no link para participar da...", time: "5d" },
        { id: 7, icon: manutencaoIcon, title: "Alerta de manutenção", info: "A manutenção na garagem será amanhã.", time: "2d" },
        { id: 8, icon: perfilIcon, title: "Atualização de perfil", info: "Seu perfil foi atualizado com sucesso.", time: "3h" },
        { id: 9, icon: comunicadosIcon, title: "Tarefa concluída", info: "A limpeza do salão de festas foi realizada.", time: "1d" },
        { id: 10, icon: financeiroIcon, title: "Pagamento recebido", info: "Seu pagamento foi confirmado.", time: "4h" }
      ]      

    return (
        <>
            <section className="search-bar">
                <h1>Notificações</h1>
                <div className="search">
                    <input type="text" placeholder="Pesquisar" value={value} onChange={onChange} onKeyDown={onKeyDown} />
                    <button className="search-btn" onClick={addTask()}><FaSearch /></button>
                </div>
            </section>
            <section className="notifications">
                {
                    notifications.map((notification)=>{
                        return (
                            <NotificationUnit
                            key={notification.id}
                            Icon={notification.icon}
                            Title={notification.title}
                            Info={notification.info}
                            Time={notification.time}
                            />
                        )
                    })
                }
            </section>
        </>
    )
}