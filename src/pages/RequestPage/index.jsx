import { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import './style.css';
import { FaArrowLeft } from "react-icons/fa6";
import { collection, getDocs, query, orderBy, addDoc } from "firebase/firestore";
import db from '../../services/firebaseConfig';
import { jwtDecode } from 'jwt-decode';

export default function RequestsPage() {
    const [selectedContact, setSelectedContact] = useState(null);
    const [message, setMessage] = useState("");
    const [contacts, setContacts] = useState([]);
    const messagesEndRef = useRef(null);
    const [condoId, setCondoId] = useState('argus');
    const currentUserCpf = jwtDecode(localStorage.getItem("authToken")).sub;

    // Carrega os contatos do Firestore
    useEffect(() => {
        const loadContacts = async () => {
            const contactsRef = collection(db, `contacts/${condoId}/contact`);
            const querySnapshot = await getDocs(contactsRef);
            const loadedContacts = await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const contactData = doc.data();
                    const messagesRef = collection(db, `contacts/${condoId}/contact/${doc.id}/chats`);
                    const q = query(messagesRef, orderBy("timestamp"));
                    const messagesSnapshot = await getDocs(q);
                    const loadedMessages = messagesSnapshot.docs.map(messageDoc => messageDoc.data());

                    return {
                        id: doc.id,
                        ...contactData,
                        messages: loadedMessages || [],
                    };
                })
            );
            setContacts(loadedContacts);
        };

        loadContacts();
    }, [condoId]);

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
    };

    const handleSendMessage = async () => {
        if (message.trim() !== "") {
            // Definir um chatId único entre os dois contatos
            const chatId = [currentUserCpf, selectedContact.cpf].sort().join("-");

            const newMessage = {
                senderName: JSON.parse(localStorage.getItem("currentUser")).nome,
                senderCpf: jwtDecode(localStorage.getItem("authToken")).sub,
                receiverCpf: selectedContact.cpf,
                receiverName: selectedContact.name,
                timestamp: Date.now(),
                message: message,
                chatId: chatId, // Identificador único para o chat
            };

            // Envia a mensagem para o Firestore dentro do chat específico
            await addDoc(collection(db, `contacts/${condoId}/contact/${selectedContact.id}/chats`), newMessage);

            // Atualiza o estado do contato selecionado
            setSelectedContact((prevState) => ({
                ...prevState,
                messages: [...prevState.messages, newMessage],
            }));

            // Atualiza o estado da lista de contatos
            setContacts((prevContacts) =>
                prevContacts.map((contact) =>
                    contact.id === selectedContact.id
                        ? {
                              ...contact,
                              messages: [...contact.messages, newMessage],
                          }
                        : contact
                )
            );

            setMessage(""); // Limpa o campo de mensagem
        }
    };

    const handleDeselectContact = () => {
        setSelectedContact(null);
    };

    const eraseField = () => {
        setMessage(''); // Limpa o campo de texto
    };

    const onKeyDown = (event) => {
        if (event.which === 13) {
            handleSendMessage();
        } else if (event.which === 27) {
            eraseField();
        }
    };

    return (
        <>
            <Header />
            <div className="requests-page">
                <div className={`left-panel ${selectedContact ? 'hide' : ''}`}>
                    <h2>Contatos</h2>
                    <div className="contacts-list">
                        {contacts.map((contact) => {
                            // Verificar se o CPF do contato é diferente do CPF do usuário
                            if ((contact.cpf != currentUserCpf && contact.messages.length == 0) ||
                                (contact.cpf != currentUserCpf && JSON.parse(localStorage.getItem("currentUser")).nome == contact.messages[0].senderName) ||
                                (contact.messages && contact.messages.some(msg => msg.senderCpf === currentUserCpf || msg.receiverCpf === currentUserCpf))) {
                                return (
                                    <div
                                        key={contact.id}
                                        className={`contact-card ${selectedContact?.id === contact.id ? "selected" : ""}`}
                                        onClick={() => handleSelectContact(contact)}
                                    >
                                        <img className='img-perfil' src={contact.icon} alt={`${contact.role} icon`} />
                                        <div className="contact-info">
                                            <h3>{contact.name == JSON.parse(localStorage.getItem("currentUser")).nome ? contact.messages[0].senderName : contact.name}</h3>
                                            <p>{contact.messages && contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].message : "Sem mensagens ainda"}</p>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>

                <div className={`chat-area ${selectedContact ? 'show' : ''}`}>
                    {selectedContact ? (
                        <div className="chat-window">
                            <div className='contact-title'>
                                <button onClick={handleDeselectContact}><FaArrowLeft /></button>
                                <h2>{selectedContact.messages && selectedContact.messages.length > 0 ? (
                                selectedContact.messages[0].senderCpf == currentUserCpf ?
                                 selectedContact.messages[0].receiverName :
                                  selectedContact.messages[0].senderName) :
                                  ("Novo Chat")}</h2>
                            </div>
                            <div className="messages">
                                {selectedContact.messages && selectedContact.messages.length > 0 ? (
                                    selectedContact.messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`message ${msg.senderCpf == jwtDecode(localStorage.getItem("authToken")).sub ? "sent" : "received"}`}
                                        >
                                            <p>{msg.message}</p>
                                            <span className="timestamp">
                                                {new Date(msg.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p>Sem mensagens ainda</p>
                                )}
                                <div ref={messagesEndRef}></div>
                            </div>
                            <div className="message-input">
                                <input
                                    type="text"
                                    placeholder="Digite sua mensagem..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
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
