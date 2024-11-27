import { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import './style.css';
import { FaArrowLeft } from "react-icons/fa6";
import { collection, getDocs, query, orderBy, addDoc } from "firebase/firestore";
import db from '../../services/firebaseConfig';

export default function RequestsPage() {
    const [selectedContact, setSelectedContact] = useState(null);
    const [message, setMessage] = useState("");
    const [contacts, setContacts] = useState([]);
    const messagesEndRef = useRef(null);
    const [condoId, setCondoId] = useState('1');

    // Carrega os contatos do Firestore
    useEffect(() => {
        const loadContacts = async (condoId) => {
            const contactsRef = collection(db, `condominiuns/${condoId}/contacts`);
            const querySnapshot = await getDocs(contactsRef);
            const loadedContacts = await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const contactData = doc.data();
                    const messagesRef = collection(db, `condominiuns/${condoId}/contacts/${doc.id}/messages`);
                    const q = query(messagesRef, orderBy("timestamp"));
                    const messagesSnapshot = await getDocs(q);
                    const loadedMessages = messagesSnapshot.docs.map(messageDoc => messageDoc.data());

                    return {
                        id: doc.id,
                        ...contactData,
                        messages: loadedMessages || [], // Garantir que 'messages' seja sempre um array
                    };
                })
            );
            setContacts(loadedContacts);
        };

        loadContacts(condoId);
    }, [condoId]);

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
    };

    const handleSendMessage = async (condoId) => {
        if (message.trim() !== "") {
            const newMessage = {
                sender: "Você",
                text: message,
                timestamp: Date.now(),
            };
    
            // Envia a mensagem para o Firestore
            await addDoc(collection(db, `condominiuns/${condoId}/contacts/${selectedContact.id}/messages`), newMessage);
    
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
            handleSendMessage(condoId);
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
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                className={`contact-card ${selectedContact?.id === contact.id ? "selected" : ""}`}
                                onClick={() => handleSelectContact(contact)}
                            >
                                <img className='img-perfil' src={contact.icon} alt={`${contact.name} icon`} />
                                <div className="contact-info">
                                    <h3>{contact.name}</h3>
                                    <p>{contact.messages && contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].text : "Sem mensagens ainda"}</p>
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
                                {selectedContact.messages && selectedContact.messages.length > 0 ? (
                                    selectedContact.messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`message ${message.sender === "Você" ? "sent" : "received"}`}
                                        >
                                            <p>{message.text}</p>
                                            <span className="timestamp">
                                                {new Date(message.timestamp).toLocaleTimeString()}
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
                                <button onClick={() => {handleSendMessage(condoId)}}>Enviar</button>
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
