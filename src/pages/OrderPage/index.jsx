import { useState, useEffect } from "react";
import db from "../../services/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Header from "../../components/Header";
import OrderCard from "../../components/OrderCard";
import "./style.css";

export default function OrderPage() {
  const [orderSend, setOrderSend] = useState(false);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({});

  const fields = [
    {
      Id: "registerNumber",
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
      Id: "receivedTime",
      Label: "Data do recebimento",
      Type: "time",
      Require: true,
    },
    {
      Id: "recipient",
      Label: "Destinatário",
      Type: "text",
      Require: true,
    },
    {
      Id: "receivedBy",
      Label: "Recebido por",
      Type: "text",
      Require: true,
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Erro ao carregar encomendas:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "orders"), formData);
      alert("Encomenda cadastrada com sucesso!");
      setFormData({
        reservation_code: "",
        record_number: "",
        type: "",
        date: "",
        recipient: "",
        received_by: "",
        description: "",
      });
      setOrderSend(false);
    } catch (error) {
      console.error("Erro ao cadastrar encomenda:", error);
      alert("Erro ao cadastrar encomenda. Tente novamente.");
    }
  };

  const resetSend = () => {
    setFormData({});
    setOrderSend(false);
  };

  return (
    <>
      <Header />
      <div className="order-page">
        <div className="main-content">
            {orderSend ? (
              <form className="order-forms" onSubmit={handleSubmit} method="POST">
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
                          <option value="Desconhecido">
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
                        {JSON.parse(localStorage.getItem("currentUser")).tipoDoUsuario != "MORADOR" ? (
                          <button className="register-button" onClick={() => {setOrderSend(!orderSend);}}>Cadastrar Nova Encomenda</button>
                        ) : (<></>)
                      }
                    </div>
                    <main className="order-list">
                        {orders.length > 0 ? (
                          orders.map((order, index) => (
                            <OrderCard key={index} order={order} />
                        ))
                        ):(<p>Nenhuma encomenda</p>)}
                    </main>
                </>
            )}
        </div>
      </div>
    </>
  );
}
