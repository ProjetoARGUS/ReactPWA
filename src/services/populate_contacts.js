import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCBU4Si1K7RjwoVWPLYZ-iq-_Vc-p_kg8",
    authDomain: "react-api-795a0.firebaseapp.com",
    projectId: "react-api-795a0",
    storageBucket: "react-api-795a0.appspot.com",
    messagingSenderId: "554318990847",
    appId: "1:554318990847:web:b264b91ce707e7d90babca"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para adicionar um contato e suas mensagens
const addContactWithMessages = async (condoName, contact, messages) => {
    try {
        // Adiciona o contato na coleção de contatos
        const contactRef = await addDoc(collection(db, `contacts/${condoName}/contact`), contact);

        // Adiciona as mensagens na subcoleção "messages"
        for (const message of messages) {
            await addDoc(collection(contactRef, "messages"), message);
        }

        console.log(`Contato ${contact.name} e mensagens adicionados com sucesso!`);
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
    }
};

// Dados de exemplo
const condoName = "argus"; // Nome do condomínio
const contacts = [
    {
        contact: {
            name: "João Silva",
            icon: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            role: "Porteiro",
            cpf: "12345678900",
        },
        messages: [
            {
                senderCpf: "12345676547",
                senderName: "anonimo",
                receiverCpf: "12345678900",
                receiverName: "João Silva",
                timestamp: Date.now(),
                message: "Olá, preciso de ajuda para entrar no prédio.",
            },
        ],
    },
    {
        contact: {
            name: "Ana Santos",
            icon: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            role: "Síndica",
            cpf: "11223344556",
        },
        messages: [
            {
                senderCpf: "12345676547",
                senderName: "anonimo",
                receiverCpf: "11223344556",
                receiverName: "Ana Santos",
                timestamp: Date.now(),
                message: "Temos uma reunião marcada para hoje às 18h.",
            },
        ],
    },
    {
        contact: {
            name: "Pedro Lima",
            icon: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            role: "Subsíndico",
            cpf: "99887766554",
        },
        messages: [],
    },
];

// Adiciona os contatos e mensagens ao Firestore
(async () => {
    for (const { contact, messages } of contacts) {
        await addContactWithMessages(condoName, contact, messages);
    }
})();
