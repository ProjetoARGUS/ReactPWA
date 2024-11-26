import { useState } from 'react';
import './style.css';
import Header from '../../components/Header';
import { FaSearch } from "react-icons/fa";

export default function FaqPage() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const questions = [
        {
            title: "Quais são as regras para o uso das áreas comuns?",
            content: "Consulte as regras na seção 'Regras do Condomínio', localizada na aba 'Regras e Normas', no Início."
        },
        {
            title: "Como posso reservar o salão de festas ou churrasqueira?",
            content: "Solicite na administração ou acesse 'Reservas' no app para agendar o salão de festas ou churrasqueira."
        },
        {
            title: "Qual é o horário permitido para realização de mudanças?",
            content: "Na seção 'Regulamentos', você encontrará os horários permitidos para mudanças."
        },
        {
            title: "Como posso solicitar reparos ou manutenção no apartamento?",
            content: "Em 'Manutenções', você pode pedir reparos; nossa equipe será notificada."
        },
        {
            title: "Onde posso encontrar informações sobre taxas do condomínio?",
            content: "Os detalhes das taxas do condomínio estão disponíveis em 'Financeiro' no app, ou se preferir, solicite na administração."
        },
        {
            title: "Como posso contatar o síndico ou administração?",
            content: "Para contato direto, visite a sala de administração ou utilize a função 'Fale com a Administração', localizada na Barra de Navegação Inferior do Início."
        },
        {
            title: "Quais são os horários permitidos para as obras e reformas?",
            content: "Verifique os horários em 'Regulamentos' no app, para saber quando realizar as reformas."
        },
        {
            title: "Como funciona o sistema de coleta de lixo e reciclagem?",
            content: "Consulte 'Coleta e Reciclagem' na tela de 'Regras e Normas' no app para instruções e horários."
        },
        {
            title: "Como posso registrar uma reclamação sobre barulho ou outros problemas?",
            content: "No app, vá para 'Mediação de Conflitos', localizado na Barra de Navegação Inferior do Início e faça sua solicitação de forma rápida e sigilosa."
        },
        {
            title: "Qual é a política para animais de estimação?",
            content: "Consulte as diretrizes para animais na seção 'Regulamentos' do app."
        },
        {
            title: "Como posso solicitar uma segunda chave do apartamento?",
            content: "Solicite uma chave adicional na administração, preenchendo o formulário disponível na seção 'Solicitações' do app."
        },
        {
            title: "Quais são as regras para utilização da academia?",
            content: "A academia pode ser usada entre 6h e 22h. É obrigatório o uso de roupas adequadas e o respeito aos horários e aos outros moradores."
        },
        {
            title: "Como posso agendar uma reunião com a administração?",
            content: "Você pode agendar uma reunião pelo app na seção 'Agendamentos' ou diretamente na administração."
        },
        {
            title: "Posso fazer alterações na fachada do meu apartamento?",
            content: "Alterações na fachada devem ser aprovadas pelo síndico e respeitar as regras estéticas do condomínio."
        },
        {
            title: "Qual é o procedimento em caso de vazamento ou emergência?",
            content: "Em caso de emergência, entre em contato com a administração imediatamente através do app ou ligue para o número de emergência disponível no mural do condomínio."
        },
        {
            title: "Onde posso guardar bicicletas e outros equipamentos pessoais?",
            content: "Bicicletas e outros equipamentos pessoais devem ser guardados nas áreas designadas, como bicicletários, conforme as regras de uso."
        },
        {
            title: "Posso organizar eventos na área externa do condomínio?",
            content: "Eventos na área externa precisam de autorização prévia da administração e devem respeitar os horários e regras de convivência."
        },
        {
            title: "Como posso consultar meu saldo de taxa de condomínio?",
            content: "Consulte seu saldo de taxa de condomínio na seção 'Financeiro' do app ou entre em contato com a administração."
        },
        {
            title: "Qual é o procedimento para receber correspondências no condomínio?",
            content: "As correspondências são entregues na recepção do condomínio. Você será notificado para retirá-las assim que chegarem."
        },
        {
            title: "Como posso solicitar o uso da churrasqueira?",
            content: "Para utilizar a churrasqueira, solicite a reserva na administração ou através da função 'Reservas' no app."
        }
    ];

    const filteredquestions = questions.filter(rule =>
        rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header />
            <section className="faq-page">
                <div className="faq-search">
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
                    {filteredquestions.map((rule, index) => (
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
            </section>
        </>
    );
}
