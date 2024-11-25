import { useState } from "react";
import Header from "../../components/Header";
import "./style.css";

export default function ReservationsPage() {
  const fields = [
    {
      Id: "reservation-period",
      Label: "Período da reserva*",
      Type: "select",
      Require: true,
      Options: ["Manhã", "Tarde", "Noite"],
    },
    {
      Id: "location",
      Label: "Escolha o local da reserva*",
      Type: "select",
      Require: true,
      Options: ["Salão de festas", "Quadra",],
    },
    { Id: "date", Label: "Selecione a data*", Type: "date", Require: true },
  ];

  const [formData, setFormData] = useState({
    "reservation-period": "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Função para formatar a data de YYYY-MM-DD para DD/MM/YYYY
  const formatDate = (date) => {
    if (!date) return "Não selecionada";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Header />
      <section className="reservations-page">
        <h1>Bem-vindo! Solicite sua reserva</h1>
        <form className="reservations-forms" action="#" method="POST">
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
                    <option value="" disabled>
                      Selecione
                    </option>
                    {field.Options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
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
            <div className="description-container poppins-bold">
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Descreva aqui o que vai acontecer"
              ></textarea>
            </div>
          </div>
          <div className="extra-info">
            <p>
              <strong>INFORMAÇÕES SOBRE A RESERVA</strong>
            </p>
            <p>
              Data:{" "}
              <span className="reservation-info">
                {formatDate(formData.date)}
              </span>
            </p>
            <p>
              Local:{" "}
              <span className="reservation-info">
                {formData.location || "Nenhum local selecionado"}
              </span>
            </p>
            <p>
              Período:{" "}
              <span className="reservation-info">
                {formData["reservation-period"] || "Nenhum período selecionado"}
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="submit">Enviar</button>
            <button
              type="reset"
              onClick={() =>
                setFormData({ "reservation-period": "", location: "", date: "" })
              }
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
