import { useState } from 'react';
import Header from '../../components/Header'; // Importação do Header
import './style.css';
import { Link } from 'react-router-dom'; // Para navegação se estiver usando React Router
import { FaArrowLeft } from "react-icons/fa6";

export default function RequestsPage() {
    const [selectedContact, setSelectedContact] = useState(null); // Para armazenar o contato selecionado
    const [search, setSearch] = useState(""); // Estado para armazenar a pesquisa
    const [message, setMessage] = useState(""); // Estado para armazenar a mensagem digitada

    const recentContacts = [
        {
            id: 1,
            name: "Síndico",
            messages: [
                { sender: "Você", text: "Poderia verificar por favor?" },
                { sender: "Síndico", text: "Preciso resolver isso urgente..." },
            ],
            icon: "icon1.png"
        },
        {
            id: 2,
            name: "Zelador",
            messages: [
                { sender: "Você", text: "Boa tarde, Francisco. Meu controle de acesso está quebrado." },
                { sender: "Zelador", text: "Entendido! Vou verificar." },
            ],
            icon: "icon2.png"
        },
        {
            id: 3,
            name: "João",
            messages: [
                { sender: "Você", text: "Você já recebeu o meu pedido?" },
                { sender: "João", text: "Sim, estou verificando!" },
            ],
            icon: "icon3.png"
        },
        {
            id: 4,
            name: "Maria",
            messages: [
                { sender: "Você", text: "O reparo já foi feito?" },
                { sender: "Maria", text: "Ainda não, estou aguardando." },
            ],
            icon: "icon4.png"
        },
    ];

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            const newMessage = { sender: "Você", text: message };
            // Adiciona a mensagem à lista do contato selecionado
            setSelectedContact((prevState) => ({
                ...prevState,
                messages: [...prevState.messages, newMessage],
            }));
            setMessage(""); // Limpa o campo de entrada
        }
    };

    const handleDeselectContact = () => {
        setSelectedContact(null); // Desmarca o contato selecionado
    };

    const eraseField = () =>{
        setMessage('');
    };

    const onKeyDown = (event) =>{
        if (event.which ===  13){
            handleSendMessage();
        } else if(event.which === 27){
            eraseField();
        }
    };

    return (
        <>
            <Header /> {/* Renderização do cabeçalho */}
            <div className="requests-page">
                <div className={`left-panel ${selectedContact ? 'hide' : ''}`}>
                    <h2>Contatos</h2>
                    <div className="contacts-list">
                        {recentContacts.map((contact) => (
                            <div
                                key={contact.id}
                                className={`contact-card ${selectedContact?.id === contact.id ? "selected" : ""}`}
                                onClick={() => handleSelectContact(contact)}
                            >
                                <img src={contact.icon} alt={`${contact.name} icon`} />
                                <div className="contact-info">
                                    <h3>{contact.name}</h3>
                                    {/* Exibe a última mensagem */}
                                    <p>{contact.messages[contact.messages.length - 1].text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`chat-area ${selectedContact ? 'show' : ''}`}>
                    {selectedContact ? (
                        <div className="chat-window">
                            <div className='contact-title'>
                                <button onClick={handleDeselectContact}><FaArrowLeft /></button>
                                <h2>{selectedContact.name}</h2>
                            </div>
                            <div className="messages">
                                {selectedContact.messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`message ${message.sender === "Você" ? "sent" : "received"}`}
                                    >
                                        <p>{message.text}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="message-input">
                                <input
                                    type="text"
                                    placeholder="Digite sua mensagem..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)} // Atualiza o valor da mensagem
                                    onKeyDown={onKeyDown}
                                />
                                <button onClick={handleSendMessage}>Enviar</button>
                            </div>
                        </div>
                    ) : (
                        <div className="no-contact-selected">
                            <h3>Selecione um contato para iniciar a conversa.</h3>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
