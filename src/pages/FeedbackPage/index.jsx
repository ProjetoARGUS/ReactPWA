import axios from 'axios';
import Header from '../../components/Header';
import TextFieldInput from '../../components/TextFieldInput';
import './style.css';

export default function FeedbackPage() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formValues = {};
        formData.forEach((value, key) => {
            formValues[key] = value;
        });

        const feedbackData = {
            titulo: "Manutenção",
            descricao: formValues.description,
            tipo: "FEEDBACK",
            idUsuario: JSON.parse(localStorage.getItem("currentUser")).id,
            idArea: null
        };

        console.log("Dados enviados:", feedbackData);

        try {
            const response = await axios.post(`https://18.228.153.53:8080/ocorrencias`, feedbackData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            console.log("Resposta do servidor:", response.data);
            alert("Feedback enviado com sucesso!")
            window.location.href="/home"
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            alert("Falha ao enviar Feedback!")
        }

        e.target.reset();
    };

    return (
        <>
            <Header />
            <section className="feedback-page">
                <h1>Bem-vindo! Aqui você pode opinar sobre seu condomínio ou app!</h1>
                <form className='feedback-forms' onSubmit={handleSubmit} method="POST">
                    <div className="pessoal">
                        <TextFieldInput
                            Label="Título *"
                            Id="localizacao"
                            Require={true}
                        />
                    </div>
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
