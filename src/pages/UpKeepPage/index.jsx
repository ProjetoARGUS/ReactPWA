import CheckBoxInput from '../../components/CheckBoxInput';
import Header from '../../components/Header';
import TextFieldInput from '../../components/TextFieldInput';
import './style.css';

export default function UpKeepPage() {
    const checkboxes = [
        { Id: "limpeza-caixa-dagua", Label: "Caixa D'água (Limpeza)" },
        { Id: "vazamento-caixa-dagua", Label: "Caixa D'água (Vazamento)" },
        { Id: "calhas", Label: "Calhas" },
        { Id: "recarga-extintor", Label: "Extintor (Recarga)" },
        { Id: "falta-dagua", Label: "Falta D'água" },
        { Id: "conserto-fechadura", Label: "Conserto de Fechadura" },
        { Id: "recarga-gas", Label: "Recarga de Gás" },
        { Id: "vazamento-telhado", Label: "Telhado (Vazamento)" },
        { Id: "troca-lampadas", Label: "Troca de Lâmpadas" },
        { Id: "conserto-hidraulica", Label: "Conserto de Hidráulica" },
        { Id: "conserto-eletrico", Label: "Conserto Elétrico" },
        { Id: "outros", Label: "Outros" },
    ];

    const textfields = [
        { Id: "nome", Label: "Nome*", Require: true },
        { Id: "telefone", Label: "Telefone*", Require: true },
        { Id: "email", Label: "E-mail", Require: false },
        { Id: "local", Label: "Localização*", Require: true },
    ];

    return (
        <>
            <Header />
            <section className="upkeep-page">
                <h1>Bem-vindo! Como posso ajudá-lo(a) hoje?</h1>
                <form className='upkeep-forms' action="#" method="POST">
                    <div className="pessoal">
                        {
                            textfields.map((textfield, index) => (
                                <TextFieldInput
                                    key={index}
                                    Label={textfield.Label}
                                    Id={textfield.Id}
                                    Require={textfield.Require}
                                    className={textfield.Id === "telefone" ? "number" : ""}
                                />
                            ))
                        }
                    </div>
                    <fieldset>
                        <legend>Reparo(s) Necessário(s):</legend>
                        <section className="checkbox-group">
                            {
                                checkboxes.map((checkbox, index) => (
                                    <CheckBoxInput
                                        key={index}
                                        Id={checkbox.Id}
                                        Label={checkbox.Label}
                                    />
                                ))
                            }
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
