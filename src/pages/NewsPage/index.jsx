import { useState, useEffect } from "react";
import Header from "../../components/Header";
import "./style.css";
import axios from "axios";

export default function NewsPage() {
  const [newsSend, setNewsSend] = useState(false);
  const [comunicadosItems, setComunicadosItems] = useState([]);

  const loading = async () => {
    try {
      const response = await axios.get("http://18.228.153.53:8080/comunicado", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setComunicadosItems(response.data);
      console.log("Dados carregados:", response.data);
    } catch (error) {
      console.error("Erro ao carregar comunicados:", error);
    }
  };

  useEffect(() => {
    loading();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitSend = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const newItem = {
      condominioNome: user.condominioNome,
      titulo: formData.title,
      mensagem: formData.description,
    };
    console.log(newItem);
    try {
      const response = await axios.post(
        "http://18.228.153.53:8080/comunicado",
        newItem, // Corpo da requisição
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Resposta da API:", response.data);
      alert("Comunicado criado com sucesso!")
      window.location.href="/home"
    } catch (error) {
      console.error("Erro ao enviar comunicado:", error);
      alert("Erro ao criar comunicado!")
    }
    resetSend();
  };

  const resetSend = () => {
    setFormData({
      title: "",
      description: "",
    });
    setNewsSend(false);
  };

  return (
    <>
      <Header />
      <div className="news-page">
        <div className="main-content">
          {newsSend ? (
            <form className="news-forms" onSubmit={submitSend}>
              <div className="fields-group">
                <div className="field-container">
                  <label htmlFor="news_code">Título</label>
                  <input
                    id="news_code"
                    name="title"
                    type="text"
                    required={true}
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="desc-div">
                  <label className="poppins-bold" htmlFor="description">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Insira a descrição do comunicado..."
                  ></textarea>
                </div>
              </div>
              <div className="buttons">
                <button type="submit">Enviar</button>
                <button className="resetNews" type="button" onClick={resetSend}>
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <h1>Bem-vindo! Aqui você encontrará informações importantes</h1>
              {JSON.parse(localStorage.getItem("currentUser")).tipoDoUsuario != "MORADOR" ? (
                <button
                className="register-button"
                onClick={() => setNewsSend(true)}
              >
                Cadastrar Novo Comunicado
              </button>)  : (<></>)}

              <div className="news-list">
                {comunicadosItems
                  .slice()
                  .reverse()
                  .map((comm, index) => (
                    <div key={index} className="info-card">
                      <h2>{comm.titulo}</h2>
                      <p>{comm.mensagem}</p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
