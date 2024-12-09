import { useState } from 'react';
import './style.css';
import Header from '../../components/Header';
import { FaSearch } from "react-icons/fa";

export default function RulesPage() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const rules = [
        {
            title: "Regras de Convivência",
            content: "Respeitar os horários de silêncio (22h às 7h), evitar barulhos altos e tratar todos os moradores e funcionários com respeito."
        },
        {
            title: "Regras para Uso de Áreas Comuns",
            content: "As áreas comuns devem ser mantidas limpas e organizadas. Não é permitido reservar ou bloquear áreas sem autorização prévia do síndico."
        },
        {
            title: "Regras para Estacionamento",
            content: "Estacione apenas nas vagas designadas. Não é permitido estacionar em locais que bloqueiem a passagem ou atrapalhem outros moradores."
        },
        {
            title: "Regras para Animais de Estimação",
            content: "Os animais devem estar sempre na coleira nas áreas comuns. É responsabilidade do tutor limpar qualquer sujeira feita pelo animal."
        },
        {
            title: "Regras para Reformas e Obras",
            content: "Reformas devem ser comunicadas com antecedência e só podem ocorrer em dias úteis, entre 8h e 17h. O descarte de entulhos é responsabilidade do proprietário."
        },
        {
            title: "Regras de Segurança",
            content: "Mantenha portões e portas sempre trancados. Não permita a entrada de estranhos sem autorização. Evite divulgar informações do condomínio para pessoas externas."
        },
        {
            title: "Regras para Lixo e Reciclagem",
            content: "Separe o lixo reciclável do orgânico. Respeite os horários de coleta e utilize os pontos de descarte corretamente."
        },
        {
            title: "Regras para o Financeiro",
            content: "As taxas de condomínio devem ser pagas até o dia 10 de cada mês. Multas serão aplicadas em caso de atrasos superiores a 30 dias."
        },
        {
            title: "Regras para Eventos no Salão de Festas",
            content: "Reservas devem ser feitas com antecedência. Após o evento, a limpeza é de responsabilidade do locatário. Horário máximo permitido: até 23h."
        },
        {
            title: "Regras para Mudanças",
            content: "Mudanças devem ser agendadas com o síndico e só podem ocorrer em dias úteis, das 8h às 17h. Danos causados nas áreas comuns durante a mudança são de responsabilidade do morador."
        },
        {
            title: "Regras para Crianças nas Áreas Comuns",
            content: "Crianças devem estar sempre acompanhadas por um responsável ao usar as áreas comuns, como playgrounds e salões de jogos."
        }
    ];

    const filteredRules = rules.filter(rule =>
        rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header />
            <section className="rules-page">
                <div className="container">
                    <h1 className="title">Regras do Condomínio</h1>
                    <div className="rules-search">
                        <div className="search">
                            <input
                                type="text"
                                placeholder="Pesquisar"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="search-btn" onClick={() => setSearchTerm(searchTerm)}>
                                <FaSearch />
                            </button>
                        </div>
                    </div>

                    <div className="dropdown-container">
                        {filteredRules.map((rule, index) => (
                            <div
                                key={index}
                                className={`dropdown ${openDropdown === index ? 'open' : ''}`}
                                onClick={() => toggleDropdown(index)}
                            >
                                <div className="dropdown-header">{rule.title}</div>
                                {openDropdown === index && (
                                    <div className="dropdown-content">{rule.content}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
