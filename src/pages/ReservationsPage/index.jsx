import { useState, useEffect } from "react";
import Header from "../../components/Header";
import "./style.css";
import axios from "axios";

export default function ReservationsPage() {
  const [areasCondominio, setAreasCondominio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar as áreas comuns
  const loadingAreas = async () => {
    try {
      const response = await axios.get("/spring/areasComuns", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setAreasCondominio(response.data || []); // Certifique-se de que a resposta seja um array
    } catch (err) {
      setError("Erro ao carregar áreas comuns. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadingAreas();
  }, []);

  const fields = [
    {
      Id: "location",
      Label: "Escolha o local da reserva*",
      Type: "select",
      Require: true,
      Options: areasCondominio, // Usar areasCondominio diretamente
    },
    { Id: "date", Label: "Selecione a data*", Type: "date", Require: true },
    {
      Id: "time-inicio",
      Label: "Selecione o inicio*",
      Type: "time",
      Require: true,
    },
    { Id: "time-fim", Label: "Selecione o fim*", Type: "time", Require: true },
  ];

  const [formData, setFormData] = useState({
    areaNome: "",
    dataReserva: "",
    horaInicio: "",
    horaFim: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    if (id === "time-fim") {
      validateTimes(value);
    }
  };

  const validateTimes = (endTime) => {
    if (formData["horaInicio"] && endTime <= formData["horaInicio"]) {
      setErrorMessage(
        "O horário de fim não pode ser menor que o horário de início."
      );
    } else {
      setErrorMessage("");
    }
  };

  const formatDate = (date) => {
    if (!date) return "Não selecionada";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Reserva: ${JSON.stringify(formData)}`);
    // Aqui você pode fazer o envio da reserva para o backend
  };

  return (
    <>
      <Header />
      <section className="reservations-page">
        <h1>Bem-vindo! Solicite sua reserva</h1>
        <form
          className="reservations-forms"
          onSubmit={handleSubmit}
          method="POST"
        >
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
                    <option value="">Selecione</option>
                    {field.Options.map((option, idx) => (
                      <option key={idx} value={nome}>
                        {nome}
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
          </div>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <div className="extra-info">
            <p>
              <strong>INFORMAÇÕES SOBRE A RESERVA</strong>
            </p>
            <p>
              Data:{" "}
              <span className="reservation-info">
                {formatDate(formData.dataReserva)}
              </span>
            </p>
            <p>
              Local:{" "}
              <span className="reservation-info">
                {formData.areaNome || "Nenhum local selecionado"}
              </span>
            </p>
            <p>
              Período:{" "}
              <span className="reservation-info">
                {formData["horaInicio"] && formData["horaFim"]
                  ? `${formData["horaInicio"]} - ${formData["horaFim"]}`
                  : "Nenhum período selecionado"}
              </span>
            </p>
          </div>

          <div className="buttons">
            <button type="submit" disabled={!!errorMessage}>
              Enviar
            </button>
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  areaNome: "",
                  dataReserva: "",
                  horaInicio: "",
                  horaFim: "",
                })
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
