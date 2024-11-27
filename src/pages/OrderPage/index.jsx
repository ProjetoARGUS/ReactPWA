import { useState } from "react";
import Header from "../../components/Header";
import OrderCard from "../../components/OrderCard";
import gateIcon from "../../assets/gateIcon.png";
import Order1 from "../../assets/OrderImg/order1.svg";
import Order2 from "../../assets/OrderImg/order2.svg";
import Order3 from "../../assets/OrderImg/order3.svg";
import "./style.css";

export default function OrderPage() {
  const [orderSend, setOrderSend] = useState(false);
  const orders = [
    {
      id: 123456,
      image: Order1,
      type: "Pacote",
      recipient: "Neide da Silva",
      registerNumber: "Não informado",
      receivedTime: "Segunda-feira, 17:32",
      receivedBy: "Ferdinando Lima",
    },
    {
      id: 654321,
      image: Order2,
      type: "Pacote",
      recipient: "Neide da Silva",
      registerNumber: "Não informado",
      receivedTime: "Quinta-feira, 10:20",
      receivedBy: "Ferdinando Lima",
    },
    {
      id: 148952,
      image: Order3,
      type: "Pacote",
      recipient: "Neide da Silva",
      registerNumber: "Não informado",
      receivedTime: "Quarta-feira, 13:00",
      receivedBy: "Robson Barbosa",
    },
    {
      id: 654321,
      image: Order2,
      type: "Pacote",
      recipient: "Neide da Silva",
      registerNumber: "Não informado",
      receivedTime: "Quinta-feira, 10:20",
      receivedBy: "Ferdinando Lima",
    },
    {
      id: 148952,
      image: Order3,
      type: "Pacote",
      recipient: "Neide da Silva",
      registerNumber: "Não informado",
      receivedTime: "Quarta-feira, 13:00",
      receivedBy: "Robson Barbosa",
    },
    {
      id: 654321,
      image: Order2,
      type: "Pacote",
      recipient: "Neide da Silva",
      registerNumber: "Não informado",
      receivedTime: "Quinta-feira, 10:20",
      receivedBy: "Ferdinando Lima",
    },
    {
      id: 148952,
      image: Order3,
      type: "Pacote",
      recipient: "Neide da Silva",
      registerNumber: "Não informado",
      receivedTime: "Quarta-feira, 13:00",
      receivedBy: "Robson Barbosa",
    },
  ];

  const fields = [
    {
      Id: "reservation-code",
      Label: "Código de retirada",
      Type: "text",
      Require: true,
    },
    {
      Id: "record-number",
      Label: "Número de registro",
      Type: "text",
      Require: true,
    },
    {
      Id: "type",
      Label: "Tipo",
      Type: "select",
      Require: true,
      Options: ["Documento", "Pacote", "Outro"],
    },
    {
      Id: "date",
      Label: "Data do recebimento",
      Type: "date",
      Require: true,
    },
    {
      Id: "recipient",
      Label: "Destinatário",
      Type: "text",
      Require: true,
    },
    {
      Id: "received-by",
      Label: "Recebido por",
      Type: "text",
      Require: true,
    },
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

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const submitSend = () => {

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
      setOrderSend(!orderSend);
  };

  return (
    <>
      <Header />
      <div className="order-page">
        <div className="left-sidebar">
          <div className="chat-icon" onClick={toggleChat}>
            <img
              src={gateIcon}
              className="gate-icon"
              alt="Chat com a portaria"
            />
            <p className="chat-text">Portaria</p>
          </div>
          {isChatOpen && (
            <div className="chat-box">
              <div className="chat-header">
                <h2 className="poppins-bold">Chat com a portaria</h2>
                <button className="close-chat" onClick={toggleChat}>
                  X
                </button>
              </div>
              <div className="chat-body">
                <p><strong>Portaria:</strong> Como posso ajudar?</p>
                <p><strong>Você:</strong> Olá, tenho uma dúvida sobre minha encomenda.</p>
              </div>
              <input
                type="text"
                className="chat-input"
                placeholder="Digite sua mensagem..."
              />
            </div>
          )}
        </div>

        <div className="main-content">
            {orderSend ? (
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
                  <label className="poppins-bold" htmlFor="description">
                    Descrição
                  </label>
                  <div className="description-container">
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
                  <button type="submit" onSubmit={() => {setOrderSend(!orderSend);}}>Enviar</button>
                  <button type="reset" onClick={resetSend} >Cancelar</button>
                </div>
              </form>
            ) : (
                <>
                    <div>
                        <h1 className="page-title">Bem-vindo! Aqui estará registrado a entrega de suas encomendas.</h1>
                        <button className="register-button" onClick={() => {setOrderSend(!orderSend);}}>Cadastrar Nova Encomenda</button>
                    </div>
                    <main className="order-list">
                        {orders.map((order, index) => (
                            <OrderCard key={index} order={order} />
                        ))}
                    </main>
                </>
            )}
        </div>
      </div>
    </>
  );
}
