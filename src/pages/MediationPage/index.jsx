
import Header from '../../components/Header';
import './style.css';

export default function MediationPage() {
    const fields = [
        { Id: "data-ocorrencia", Label: "Data do Ocorrido", Type: "date", Require: true },
        { Id: "tipo-conserto", Label: "Tipo de Conserto", Type: "text", Require: true },
        { Id: "onde-ocorreu", Label: "Onde Ocorreu", Type: "text", Require: true },
        { Id: "vitima", Label: "Vítima Envolvida", Type: "text", Require: false },
        { Id: "urgencia", Label: "Urgência", Type: "text", Require: false },
        { Id: "estado", Label: "Estado", Type: "text", Require: false },
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
                                <input
                                    id={field.Id}
                                    name={field.Id}
                                    type={field.Type}
                                    required={field.Require}
                                />
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
