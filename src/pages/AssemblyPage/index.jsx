import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AssemblyInit from '../../components/AssemblyInit';
import AssemblyForms from '../../components/AssemblyForms';
import './style.css';
import axios from 'axios';

export default function AssemblyPage() {
    const [currentContent, setCurrentContent] = useState('init');
    const [obrasData, setObrasData] = useState([]);

    const obraInputs = [
        { Id: "proposta", Label: "Proposta *", Require: true , Type: "text" },
        { Id: "descricao-obra", Label: "Descrição da Obra*", Require: true , Type: "text" },
        { Id: "data-inicio", Label: "Data de Início*", Require: true , Type: "date" },
        { Id: "data-fim", Label: "Data Prevista de Término", Require: false , Type: "date" },
    ];

    const meetingInputs = [
        { Id: "titulo-reuniao", Label: "Título da Reunião*", Require: true , Type: "text" },
        { Id: "data-reuniao", Label: "Data da Reunião*", Require: true , Type: "date" },
        { Id: "hora-reuniao", Label: "Hora da Reunião*", Require: true , Type: "time" },
        { Id: "local-reuniao", Label: "Local da Reunião*", Require: true , Type: "select", Options: ["Salas de reunião em escritórios", "Auditórios", "Espaços de coworking", "Cafeterias ou restaurantes", "Casas ou salas de estar", "Parques", "Praças ou áreas de convivência"] },
        { Id: "pauta", Label: "Pauta da Reunião", Require: false , Type: "text" },
    ];

    const formatDate = (date) => {
        if (!date) return "Não selecionada";
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    const getObras = async () => {
        try {
            const response = await axios.get(
                "/spring/sessaoVotacao",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            setObrasData(response.data); // Store response data in state
        } catch (error) {
            console.error("Erro ao carregar obras:", error);
        }
    };

    const handleSubmitObras = async (formData) => {
        const obrasData = {
            "proposta": formData.proposta,
            "descricao": formData["descricao-obra"],
            "dataInicio": formatDate(formData["data-inicio"]),
            "dataFim": formatDate(formData["data-fim"]),
            "condominioNome": JSON.parse(localStorage.getItem("currentUser")).condominioNome
        };
        try {
            const response = await axios.post(
                "/spring/sessaoVotacao",
                obrasData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            console.log("Resposta da API:", response.data);
            alert("Proposta de obra enviada!");
            window.location.href="/home"
        } catch (error) {
            console.error("Erro ao enviar obra:", error);
            alert("Erro ao enviar proposta de obra!")
        }
    };

    const handleSubmitReunioes = async (formData) => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const newItem = {
            condominioNome: user.condominioNome,
            titulo: `Reunião ${formData["titulo-reuniao"]}`,
            mensagem: `No dia ${formData["data-reuniao"]} às ${formData["hora-reuniao"]} nos reuniremos no(a) ${formData["local-reuniao"]} com a pauta "${formData["pauta"]}"`,
        };
        try {
            const response = await axios.post(
                "/spring/comunicado",
                newItem,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            console.log("Resposta da API:", response.data);
            alert("Reunião criada e comunicada aos moradores!");
            window.location.href='/home';
        } catch (error) {
            console.error("Erro ao enviar reunião:", error);
            alert("Erro ao enviar reunião")
        }
    };

    const renderContent = () => {
        switch (currentContent) {
            case 'obras':
                return <AssemblyForms Inputs={obraInputs} OnSubmit={handleSubmitObras} />;
            case 'reunioes':
                return <AssemblyForms Inputs={meetingInputs} OnSubmit={handleSubmitReunioes} />;
            default:
                return <AssemblyInit />;
        }
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("currentUser")).tipoDoUsuario === "MORADOR") {
            getObras(); // Call getObras if user is "MORADOR"
        }
    }, []);

    return (
        <>
            <Header />
            <section className="assembly-page">
                {JSON.parse(localStorage.getItem("currentUser")).tipoDoUsuario !== "MORADOR" ? (
                    <>
                        <div className="assembly-buttons">
                            <button className="button-obras" onClick={() => setCurrentContent('obras')}>Obras e melhorias</button>
                            <button className="button-reunioes" onClick={() => setCurrentContent('reunioes')}>Reuniões</button>
                        </div>
                        <div className="assembly-content">
                            {renderContent()}
                        </div>
                    </>
                ) : (
                    <>
                    <h1>Assembleia: Obras e Melhorias</h1>
                    <div className="assembly-content">
                        {obrasData.length > 0 ? (
                            <div className="obras-list">
                                {/* Render a list or details of Obras */}
                                {obrasData.map((obra, index) => (
                                    <div key={index} className="obras-card">
                                        <h1 className="obras-card-title">{obra.proposta}</h1>
                                        <p className="obras-card-description">{obra.descricao}</p>
                                        <div className="obras-card-dates">
                                            <p><strong>Duração de votação no Salão</strong></p>
                                            <p><strong>Início:</strong> {obra.dataInicio}</p>
                                            <p><strong>Fim:</strong> {obra.dataFim}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Sem obras para exibir</p>
                        )}
                    </div>
                    </>
                )}
            </section>
        </>
    );
}
