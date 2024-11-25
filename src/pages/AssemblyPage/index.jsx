import { useState } from 'react';
import Header from '../../components/Header';
import AssemblyInit from '../../components/AssemblyInit';
import AssemblyForms from '../../components/AssemblyForms'; // Importe o novo componente
import './style.css';

export default function AssemblyPage() {
    const [currentContent, setCurrentContent] = useState('init');

    const electionInputs = [
        { Id: "candidato-nome", Label: "Nome do Candidato*", Require: true , Type: "text" },
        { Id: "cargo", Label: "Cargo Disputado*", Require: true , Type: "text" },
        { Id: "partido", Label: "Partido*", Require: true , Type: "text" },
        { Id: "data-eleicao", Label: "Data da Eleição*", Require: true , Type: "date" },
    ];

    const obraInputs = [
        { Id: "descricao-obra", Label: "Descrição da Obra*", Require: true , Type: "text" },
        { Id: "responsavel", Label: "Responsável pela Obra*", Require: true , Type: "text" },,
        { Id: "custo-estimado", Label: "Custo Estimado*", Require: true , Type: "text" },
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
    

    const renderContent = () => {
        switch (currentContent) {
            case 'eleicoes':
                return <AssemblyForms Inputs={electionInputs} />;
            case 'obras':
                return <AssemblyForms Inputs={obraInputs} />;
            case 'reunioes':
                return <AssemblyForms Inputs={meetingInputs} />;
            default:
                return <AssemblyInit />;
        }
    };

    return (
        <>
            <Header />
            <section className="assembly-page">
                <div className="assembly-buttons">
                    <button className="button-eleicoes" onClick={() => setCurrentContent('eleicoes')} >Eleições</button>
                    <button className="button-obras" onClick={() => setCurrentContent('obras')} >Obras e melhorias</button>
                    <button className="button-reunioes" onClick={() => setCurrentContent('reunioes')} >Reuniões</button>
                </div>
                <div className="assembly-content">
                    {renderContent()}
                </div>
            </section>
        </>
    );
}
