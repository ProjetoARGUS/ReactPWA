import { useState } from "react";
import Header from "../../components/Header";
import comunicado1 from "../../assets/ComunicadosImg/comunicado1.png";
import comunicado2 from "../../assets/ComunicadosImg/comunicado2.png";
import comunicado3 from "../../assets/ComunicadosImg/comunicado3.png";
import comunicado4 from "../../assets/ComunicadosImg/comunicado4.png";
import "./style.css";

export default function NewsPage() {
  const [newsSend, setNewsSend] = useState(false);
  const comunicados_items = [
    {Img: comunicado1, Title: "Quadra em Manutenção", Desc: "A quadra esportiva passará por manutenção no dia 11/10 e ficará temporariamente indisponível para uso."},
    {Img: comunicado2, Title: "Pintura dos blocos", Desc: "Aviso aos condôminos: A pintura dos blocos começará no dia 18/11. Pedimos a colaboração e compreensão de todos..."},
    {Img: comunicado3, Title: "Manuntenção na rua 03 ", Desc: "Aviso aos condôminos: A Rua 03 passará por manutenção no dia 25/11, podendo haver restrição de acesso temporária..."},
    {Img: comunicado4, Title: "interrupção Temporaria de água", Desc: "Aviso aos condôminos: Haverá interrupção temporária no abastecimento de água no dia 28/11 devido a manutenção..."},
    {Img: comunicado2, Title: "Pintura dos blocos", Desc: "Aviso aos condôminos: A pintura dos blocos começará no dia 18/11. Pedimos a colaboração e compreensão de todos..."},
    {Img: comunicado3, Title: "Manuntenção na rua 03 ", Desc: "Aviso aos condôminos: A Rua 03 passará por manutenção no dia 25/11, podendo haver restrição de acesso temporária..."},
    {Img: comunicado4, Title: "interrupção Temporaria de água", Desc: "Aviso aos condôminos: Haverá interrupção temporária no abastecimento de água no dia 28/11 devido a manutenção..."},
    {Img: comunicado2, Title: "Pintura dos blocos", Desc: "Aviso aos condôminos: A pintura dos blocos começará no dia 18/11. Pedimos a colaboração e compreensão de todos..."},
    {Img: comunicado3, Title: "Manuntenção na rua 03 ", Desc: "Aviso aos condôminos: A Rua 03 passará por manutenção no dia 25/11, podendo haver restrição de acesso temporária..."},
    {Img: comunicado4, Title: "interrupção Temporaria de água", Desc: "Aviso aos condôminos: Haverá interrupção temporária no abastecimento de água no dia 28/11 devido a manutenção..."},
]

  const fields = [
    { Id: "reservation_code", Label: "Titulo", Type: "text", Require: true },
    { Id: "type", Label: "Urgência", Type: "select", Require: true, Options: ["Baixa", "Media", "Alta"] },
    { Id: "date", Label: "Data do recebimento", Type: "date", Require: true },
    
  ];

  const [formData, setFormData] = useState({
    reservation_code: "",
    record_number: "",
    type: "",
    date: "",
    recipient: "",
    received_by: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitSend = (e) => {
    e.preventDefault();
    console.log("Formulário enviado:", formData);
  };

  const resetSend = () => {
    setFormData({
      reservation_code: "",
      record_number: "",
      type: "",
      date: "",
      recipient: "",
      received_by: "",
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
                {fields.map((field, index) => (
                  <div key={index} className="field-container">
                    <label htmlFor={field.Id}>{field.Label}</label>
                    {field.Type === "select" ? (
                      <select
                        id={field.Id}
                        name={field.Id}
                        required={field.Require}
                        value={formData[field.Id]}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Selecione</option>
                        {field.Options.map((option, idx) => (
                          <option key={idx} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={field.Id}
                        name={field.Id}
                        type={field.Type}
                        required={field.Require}
                        value={formData[field.Id]}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}
                <div className="desc-div">
                  <label className="poppins-bold" htmlFor="description">Descrição</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descreva aqui..."
                  ></textarea>
                </div>
              </div>
              <div className="buttons">
                <button type="submit">Enviar</button>
                <button className="resetNews" type="button" onClick={resetSend}>Cancelar</button>
              </div>
            </form>
          ) : (
            <>
              <h1>Bem-vindo! Aqui você encontrará informações importantes</h1>
              <button className="register-button" onClick={() => setNewsSend(true)}>Cadastrar Novo Comunicado</button>
              <div className="news-list">
                {comunicados_items.map((comm, index) => (
                  <div key={index} className="info-card">
                    <div className="news-img">
                      <img src={comm.Img} alt={comm.Title} />
                    </div>
                    <h2>{comm.Title}</h2>
                    <p>{comm.Desc}</p>
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
