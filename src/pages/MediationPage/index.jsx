import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Header from '../../components/Header';
import './style.css';
import axios from 'axios';

const genAI = new GoogleGenerativeAI("AIzaSyCrdvZOg_tiVVLbrsLDKStSe_t_ikAhLUI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({ history: [] });

export default function MediationPage() {
    const [chatVisible, setChatVisible] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "Assistente", text: "Como posso ajudar você?", timestamp: Date.now() }
    ]); // Mensagens iniciais
    const [currentMessage, setCurrentMessage] = useState("");

    const toggleChat = () => {
        setChatVisible(!chatVisible);
    };

    const fields = [
        { Id: "data-ocorrencia", Label: "Data do Ocorrido", Type: "date", Require: true },
        { Id: "tipo-conflito", Label: "Tipo de Conflito", Type: "select", Require: true, Options: ["Problemas com lixos", "Quebra de regras e normas", "Reformas", "Uso indevido em áreas comuns", "Barulho", "Discursão", "Briga"] },
        { Id: "onde-ocorreu", Label: "Onde Ocorreu", Type: "text", Require: true },
        { Id: "envolvencia", Label: "Envolvência", Type: "select", Require: false, Options: ["Estou diretamente envolvido", "Estou indiretamente envolvido", "Conheço os envolvidos", "Desconheço os envolvidos"] },
        { Id: "urgencia", Label: "Urgência", Type: "select", Require: false, Options: ["Baixa", "Média", "Alta"] },
        { Id: "status", Label: "Status", Type: "select", Require: false, Options: ["Em andamento", "Cessado"] },
    ];

    // Função para enviar mensagem à API do Gemini (OpenAI)
    const sendMessageToGemini = async (userMessage) => {
        try {
            // Chame o método sendMessage
            const res = await chat.sendMessage(`Você é um assistente de mediação de conflitos. Responda de forma curta apenas com texto: ${userMessage}`);
            const text = res?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
            
            // Se o retorno já for JSON, não use .json()
            if (text) {
                return text;
            } else {
                throw new Error("Resposta inválida da API");
            }
        } catch (error) {
            console.error("Erro ao enviar mensagem para o Gemini:", error);
            return "Desculpe, ocorreu um erro ao processar sua mensagem.";
        }
    };
    

    // Função para gerenciar envio de mensagens
    const handleSendMessage = async () => {
        if (currentMessage.trim() !== "") {
            const userMessage = {
                sender: "Você",
                text: currentMessage,
                timestamp: Date.now(),
            };
            setMessages([...messages, userMessage]); // Adiciona a mensagem do usuário
            setCurrentMessage(""); // Limpa o campo de texto

            // Envia a mensagem ao Gemini e adiciona a resposta ao chat
            const aiResponse = await sendMessageToGemini(currentMessage);
            const geminiMessage = {
                sender: "Assistente",
                text: aiResponse,
                timestamp: Date.now(),
            };
            setMessages((prevMessages) => [...prevMessages, geminiMessage]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que a página seja recarregada ao enviar o formulário
    
        // Coleta os dados do formulário
        const formData = new FormData(e.target);
        const formValues = {};
        formData.forEach((value, key) => {
            formValues[key] = value;
        });
    
        // Aqui você pode enviar os dados para uma API ou fazer algo com eles
        const mediationData = {
            "titulo": `${formValues["tipo-conflito"]} dia ${formValues["data-ocorrencia"]} - ${formValues["onde-ocorreu"]}`,
            "descricao": `Conflito ${formValues.status} com urgencia ${formValues.urgencia}: ${formValues.description}`,
            "tipo": "DESENTENDIMENTO",
            "idUsuario": JSON.parse(localStorage.getItem("currentUser")).id,
            "idArea": null
        }
        console.log("Dados enviados:", mediationData);
        const response = await axios.post(`/spring/ocorrencias`,
                mediationData,
                {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              })
        console.log(response.data)
        // Limpa o formulário após o envio (opcional)
        e.target.reset();
    };
    

    return (
        <>
            <Header />
            <section className="mediation-page">
                <h1>Bem-vindo! Informe o seu ocorrido</h1>
                <form className="mediation-forms" onSubmit={handleSubmit} method="POST">
                    <div className="fields-group">
                        {fields.map((field, index) => (
                            <div key={index} className="field-container">
                                <label htmlFor={field.Id}>{field.Label}</label>
                                {field.Type !== "select" ? (
                                    <input
                                        id={field.Id}
                                        name={field.Id}
                                        type={field.Type}
                                        required={field.Require}
                                    />
                                ) : (
                                    <select id={field.Id} name={field.Id}>
                                        <option>Selecione uma opção</option>
                                        {field.Options.map((option, index) => (
                                            <option key={index} value={option.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}>{option}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="description-container">
                        <label htmlFor="description">Descrição do Ocorrido</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="Descreva aqui o que aconteceu"
                        ></textarea>
                    </div>
                    <div className="buttons">
                        <button type="submit">Enviar</button>
                        <button type="reset">Cancelar</button>
                    </div>
                </form>
            </section>

            {/* Botão Flutuante */}
            <button className="floating-button" onClick={toggleChat}>
                Chat
            </button>

            {/* Chat com IA */}
            {chatVisible && (
                <div className={`chat-popup ${chatVisible ? 'visible' : ''}`}>
                    <h2>Assistente Virtual</h2>
                    <div className="chat-content">
                        {/* Renderiza mensagens ordenadas por timestamp */}
                        {messages
                            .sort((a, b) => a.timestamp - b.timestamp)
                            .map((message, index) => (
                                <div key={index} className={`chatbot-message ${message.sender === "Você" ? "sent" : "received"}`}>
                                    <p>{message.text}</p>
                                    <span className="timestamp">
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                            ))}
                    </div>
                    {/* Input para digitar mensagens */}
                    <textarea
                        placeholder="Digite sua mensagem..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage(); // Envia mensagem ao pressionar Enter
                                e.preventDefault(); // Evita quebra de linha
                            }
                        }}
                    ></textarea>
                    <button className="submitMessage" onClick={handleSendMessage}>Enviar</button>
                    <button className="quitChatBot" onClick={toggleChat}>Fechar</button>
                </div>
            )}
        </>
    );
}
