
import Header from '../../components/Header';
import './style.css';

export default function MediationPage() {
    const fields = [
        { Id: "data-ocorrencia", Label: "Data do Ocorrido", Type: "date", Require: true },
        { Id: "tipo-conflito", Label: "Tipo de Conflito", Type: "select", Require: true, Options: ["Problemas com lixos", "Quebra de regras e normas", "Reformas", "Uso indevido em áreas comuns", "Barulho", "Discursão", "Briga"] },
        { Id: "onde-ocorreu", Label: "Onde Ocorreu", Type: "text", Require: true },
        { Id: "envolvencia", Label: "Envolvência", Type: "select", Require: false, Options: ["Estou diretamente envolvido", "Estou indiretamente envolvido", "Conheço os envolvidos", "Desconheço os envolvidos"] },
        { Id: "urgencia", Label: "Urgência", Type: "select", Require: false, Options: ["Baixa", "Média", "Alta"] },
        { Id: "status", Label: "Status", Type: "select", Require: false, Options: ["Em andamento", "Cessado"] },
    ];

    return (
        <>
            <Header />
            <section className="mediation-page">
                <h1>Bem-vindo! Informe o seu ocorrido</h1>
                <form className="mediation-forms" action="#" method="POST">
                    <div className="fields-group">
                        {fields.map((field, index) => (
                            <div key={index} className="field-container">
                                <label htmlFor={field.Id}>{field.Label}</label>
                                {
                                    field.Type != "select" ?
                                    <input
                                    id={field.Id}
                                    name={field.Id}
                                    type={field.Type}
                                    required={field.Require}
                                    />
                                    :
                                    <select id={field.Id} name={field.Id}>
                                        <option>Selecione uma opção</option>
                                        {
                                            field.Options.map((option, index) => (
                                                <option key={index} value={option.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}>{option}</option>
                                                ))
                                        }
                                    </select>
                                }
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
        </>
    );
}
