import { useState } from 'react';
import Header from '../../components/Header';
import AssemblyInit from '../../components/AssemblyInit';
import AssemblyForms from '../../components/AssemblyForms'; // Importe o novo componente
import './style.css';
import axios from 'axios';

export default function AssemblyPage() {
    const [currentContent, setCurrentContent] = useState('init');

    const obraInputs = [
        { Id: "proposta", Label: "Proposta *", Require: true , Type: "text" },
        { Id: "descricao-obra", Label: "Descrição da Obra*", Require: true , Type: "text" },
        { Id: "data-inicio", Label: "Data de Início*", Require: true , Type: "date" },
        { Id: "data-fim", Label: "Data Prevista de Término", Require: false , Type: "date" },
    ];

    const meetingInputs = [
        { Id: "titulo-reuniao", Label: "Título da Reunião*", Require: true , Type: "text" },
        { Id: "data-reuniao", Label: "Data da Reunião*", Require: true , Type: "date" },
        { Id: "hora-reuniao", Label: "Hora da Reunião*", Require: true , Type: "text" },
        { Id: "local-reuniao", Label: "Local da Reunião*", Require: true , Type: "select", Options: ["Salas de reunião em escritórios", "Auditórios", "Espaços de coworking", "Cafeterias ou restaurantes", "Casas ou salas de estar", "Parques", "Praças ou áreas de convivência"] },
        { Id: "pauta", Label: "Pauta da Reunião", Require: false , Type: "text" },
    ];

    const formatDate = (date) => {
        if (!date) return "Não selecionada";
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
      };

    const handleSubmitObras = async (formData) => {
        const obrasData = {
            "proposta": formData.proposta,
            "descricao": formData["descricao-obra"],
            "dataInicio": formatDate(formData["data-inicio"]),
            "dataFim": formatDate(formData["data-fim"]),
            "condominioNome": JSON.parse(localStorage.getItem("currentUser")).condominioNome
        };
        console.log(obrasData)
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
            alert("Obra enviada");
        } catch (error) {
            console.error("Erro ao enviar comunicado:", error);
        }
    };
    
    const handleSubmitReunioes = async (formData) => {
        try {
            const response = await axios.post(
                "/spring/comunicado",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            console.log("Resposta da API:", response.data);
            alert("Reunião enviada");
        } catch (error) {
            console.error("Erro ao enviar comunicado:", error);
        }
    };    

    const renderContent = () => {
        switch (currentContent) {
            case 'obras':
                return <AssemblyForms Inputs={obraInputs} OnSubmit={handleSubmitObras}/>;
            case 'reunioes':
                return <AssemblyForms Inputs={meetingInputs} OnSubmit={handleSubmitReunioes} />;
            default:
                return <AssemblyInit />;
        }
    };

    return (
        <>
            <Header />
            <section className="assembly-page">
                <div className="assembly-buttons">
                    <button className="button-obras" onClick={() => setCurrentContent('obras')} >Obras e melhorias</button>
                    <button className="button-reunioes" onClick={() => setCurrentContent('reunioes')} >Reuniões</button>
                </div>
                <div className="assembly-content">
                    {JSON.parse(localStorage.getItem("currentUser")).tipoDoUsuario != "MORADOR" ? renderContent() : <AssemblyInit />}
                </div>
            </section>
        </>
    );
}
