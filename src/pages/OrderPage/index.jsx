import { useState } from 'react'; // Para usar o estado e controlar a exibição do chat
import Header from '../../components/Header'; // Importação do Header
import OrderCard from '../../components/OrderCard';
import gateIcon from '../../assets/gateIcon.png';
import Order1 from '../../assets/OrderImg/order1.svg';
import Order2 from '../../assets/OrderImg/order2.svg';
import Order3 from '../../assets/OrderImg/order3.svg';
import './style.css';

export default function OrderPage() {
    const orders = [
        {
            id: 123456,
            image: Order1, 
            type: 'Pacote',
            recipient: 'Neide da Silva',
            registerNumber: 'Não informado',
            receivedTime: 'Segunda-feira, 17:32',
            receivedBy: 'Ferdinando Lima'
        },
        {
            id: 654321,
            image: Order2,
            type: 'Pacote',
            recipient: 'Neide da Silva',
            registerNumber: 'Não informado',
            receivedTime: 'Quinta-feira, 10:20',
            receivedBy: 'Ferdinando Lima'
        },
        {
            id: 148952,
            image: Order3,
            type: 'Pacote',
            recipient: 'Neide da Silva',
            registerNumber: 'Não informado',
            receivedTime: 'Quarta-feira, 13:00',
            receivedBy: 'Robson Barbosa'
        }
    ];

    const [isChatOpen, setIsChatOpen] = useState(false); // Estado para controlar a exibição do chat

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            <Header /> {/* Renderização do Header */}
            <div className="order-page">
                <div className="left-sidebar">
                    {/* Ícone de chat */}
                    <div className="chat-icon" onClick={toggleChat}>
                        <img src={gateIcon} className='gate-icon' alt="Chat com a portaria" /> {/* Substitua pela imagem do ícone */}
                        <p className="chat-text">Portaria</p>
                    </div>

                    {/* Janela de chat (aberta quando o estado for verdadeiro) */}
                    {isChatOpen && (
                        <div className="chat-box">
                            <div className="chat-header">
                                <h2 className='poppins-bold'>Chat com a portaria</h2>
                                <button className="close-chat" onClick={toggleChat}>X</button>
                            </div>
                            <div className="chat-body">
                                <p><strong>Portaria:</strong> Como posso ajudar?</p>
                                <p><strong>Você:</strong> Olá, tenho uma dúvida sobre minha encomenda.</p>
                            </div>
                            <input type="text" className="chat-input" placeholder="Digite sua mensagem..." />
                        </div>
                    )}
                </div>

                <div className="main-content">
                    <h1 className="page-title">Bem-vindo! Aqui estará registrado a entrega de suas encomendas.</h1>
                    <main className="order-list">
                        {orders.map((order, index) => (
                            <OrderCard key={index} order={order} />
                        ))}
                    </main>
                </div>
            </div>
        </>
    );
}
