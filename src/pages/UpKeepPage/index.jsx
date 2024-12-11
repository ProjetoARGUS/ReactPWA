import { useState } from 'react';
import axios from 'axios';
import CheckBoxInput from '../../components/CheckBoxInput';
import Header from '../../components/Header';
import TextFieldInput from '../../components/TextFieldInput';
import './style.css';

export default function UpKeepPage() {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    
    const checkboxes = [
        { Id: "caixa_dagua_limpeza", Label: "Caixa D'água (Limpeza)" },
        { Id: "caixa_dagua_vazamento", Label: "Caixa D'água (Vazamento)" },
        { Id: "calhas", Label: "Calhas" },
        { Id: "extintor", Label: "Extintor (Recarga)" },
        { Id: "falta_agua", Label: "Falta D'água" },
        { Id: "fechadura", Label: "Conserto de Fechadura" },
        { Id: "gas", Label: "Recarga de Gás" },
        { Id: "telhado", Label: "Telhado (Vazamento)" },
        { Id: "lampadas", Label: "Troca de Lâmpadas" },
        { Id: "hidraulica", Label: "Conserto de Hidráulica" },
        { Id: "eletrico", Label: "Conserto Elétrico" },
        { Id: "outros", Label: "Outros" },
    ];

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedCheckboxes([...selectedCheckboxes, value]);
        } else {
            setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formValues = {};
        formData.forEach((value, key) => {
            formValues[key] = value;
        });

        const upKeepData = {
            titulo: "Manutenção",
            descricao: `Reparos [${selectedCheckboxes.join(', ')}]: ${formValues.description}`,
            tipo: "DESENTENDIMENTO",
            idUsuario: JSON.parse(localStorage.getItem("currentUser")).id,
            idArea: null
        };

        console.log("Dados enviados:", upKeepData);

        try {
            const response = await axios.post(`https://argus-api.xyz/ocorrencias`, upKeepData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            console.log("Resposta do servidor:", response.data);
            alert("Manutenção solicitada!");
            window.location.href="/home";
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            alert("Erro ao solicitar manutenção!");
        }

        // Limpa o formulário após o envio
        setSelectedCheckboxes([]);
        e.target.reset();
    };

    return (
        <>
            <Header />
            <section className="upkeep-page">
                <h1>Bem-vindo! Solicite sua manutenção</h1>
                <form className='upkeep-forms' onSubmit={handleSubmit} method="POST">
                    <div className="pessoal">
                        <TextFieldInput
                            Label="Localização"
                            Id="localizacao"
                            Require={true}
                        />
                    </div>
                    <fieldset>
                        <legend>Reparo(s) Necessário(s):</legend>
                        <section className="checkbox-group">
                            {checkboxes.map((checkbox, index) => (
                                <CheckBoxInput
                                    key={index}
                                    Id={checkbox.Id}
                                    Label={checkbox.Label}
                                    OnChange={handleCheckboxChange}
                                    Checked={selectedCheckboxes.includes(checkbox.Id)}
                                />
                            ))}
                        </section>
                    </fieldset>
                    <div>
                        <label className='poppins-bold' htmlFor="description">Descrição</label>
                        <textarea id="description" name="description" rows="4"></textarea>
                    </div>
                    <div className='buttons'>
                        <button type="submit">Enviar</button>
                        <button type="reset">Cancelar</button>
                    </div>
                </form>
            </section>
        </>
    );
}
