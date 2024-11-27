import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCBU4Si1K7RjwoVWPLYZ-iq-_Vc-p_kg8",
    authDomain: "react-api-795a0.firebaseapp.com",
    projectId: "react-api-795a0",
    storageBucket: "react-api-795a0.firebasestorage.app",
    messagingSenderId: "554318990847",
    appId: "1:554318990847:web:b264b91ce707e7d90babca"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para adicionar um contato e suas mensagens
const addContactAndMessagesToFirestore = async (condoId, contactData, messageData) => {
    try {
        // Adiciona o contato à coleção de contatos do condomínio
        const contactRef = await addDoc(collection(db, `condominiuns/${condoId}/contacts`), contactData);

        // Verifica se há mensagem e a adiciona à subcoleção "messages"
        if (messageData) {
            await addDoc(collection(contactRef, "messages"), messageData);
            console.log("Contato e mensagem adicionados com sucesso!");
        } else {
            console.log("Contato adicionado com sucesso!");
        }
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
    }
};

// Exemplo de dados de contato e mensagem
const condoId = 1;
const contactData = {
    name: "André Felipe",
    icon: "https://www.extraconsult.com.br/wp-content/uploads/2023/04/eletricista-de-manutencao.png",
    role: "Funcionario"
};
const messageData = {
    sender: "Maria",
    text: "Oi, me avisaram que você estava me procurando!",
    timestamp: Date.now()
};

// Chama a função para adicionar o contato e a mensagem
addContactAndMessagesToFirestore(condoId, contactData);
