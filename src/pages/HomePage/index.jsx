import "./style.css";
import Header from "../../components/Header";
import HomeButton from "../../components/HomeButton";
import HomeCardOutlined from "../../components/HomeCardOutlined";
import HomeCardFilled from "../../components/HomeCardFilled";
import HomeCardProfile from "../../components/HomeCardPerfil";

import inicioIcon from "../../assets/HomeIcons/inicio.svg";
import manutencaoIcon from "../../assets/HomeIcons/manutencao.svg";
import chatIcon from "../../assets/HomeIcons/chat.svg";
import feedbackIcon from "../../assets/HomeIcons/financeiro.svg";
import encomendasIcon from "../../assets/HomeIcons/encomendas.svg";
import faqIcon from "../../assets/HomeIcons/faq.svg";
import conflitosIcon from "../../assets/HomeIcons/conflitos.svg";
import perfilIcon from "../../assets/HomeIcons/perfil.svg";
import reservasIcon from "../../assets/HomeIcons/reservas.svg";
import assembleiaIcon from "../../assets/HomeIcons/assembleia.svg";
import regrasIcon from "../../assets/HomeIcons/regras.svg";
import comunicadosIcon from "../../assets/HomeIcons/comunicados.svg";
import apartamentoIcon from "../../assets/HomeIcons/apartamento.svg";
import condominioIcon from "../../assets/HomeIcons/condominio.svg";

import HomeCardComunicados from "../../components/HomeCardComunicados";

import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState({});
  const [profileInfo, setProfileInfo] = useState({
    id: "",
    nome: "",
    cpf: "",
    senha: "",
    bloco: "",
    apartamento: "",
    condominioNome: "",
    telefone: "",
    tipoDoUsuario: "",
  });
  const [comunicadosItems, setComunicadosItems] = useState([]);

  const service_items = [
    { Icon: manutencaoIcon, Title: "Manutenção", Nav: "/upKeep" },
    { Icon: chatIcon, Title: "Solicitações", Nav: "/request" },
    { Icon: feedbackIcon, Title: "Feedback", Nav: "/feedback" },
    { Icon: encomendasIcon, Title: "Encomendas", Nav: "/order" },
    { Icon: faqIcon, Title: "Dúvidas (FAQ)", Nav: "/faq" },
    { Icon: conflitosIcon, Title: "Conflitos", Nav: "/mediation" },
    { Icon: perfilIcon, Title: "Perfil", Nav: "/profile" },
    { Icon: reservasIcon, Title: "Reservas", Nav: "/reservations" },
    { Icon: assembleiaIcon, Title: "Assembleia", Nav: "/assembly" },
    { Icon: regrasIcon, Title: "Regras", Nav: "/rules" },
  ];

  const token = localStorage.getItem("authToken");

  const formatPhoneNumber = (phone) => {
    const newPhone = `${phone}`
    return newPhone.slice(0,11).replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }
  
  const formatCPF = (cpf) => {
    const newCpf = `${cpf}`
    return newCpf.slice(0,11).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }

  const handleUser = async (decoded) => {
    try {
      const response = await axios.get(`https://18.228.153.53:8080/usuarios/cpf/${decoded.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      setProfileInfo({
        id: currentUser.id,
        nome: currentUser.nome,
        cpf: formatCPF(jwtDecode(token).sub),
        senha: localStorage.getItem("currentPassword"),
        bloco: currentUser.bloco,
        apartamento: currentUser.apartamento,
        condominioNome: currentUser.condominioNome,
        telefone: formatPhoneNumber(currentUser.telefone),
        tipoDoUsuario: currentUser.tipoDoUsuario,
      });
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error during request setup:", error.message);
      }
    }
  };

  const loadingNews = async () => {
    try {
      const response = await axios.get("https://18.228.153.53:8080/comunicado", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Adicione este cabeçalho, se necessário
        },
      });
      setComunicadosItems(response.data); // Atualiza o estado com os dados da API
    } catch (error) {
      console.error("Erro ao carregar comunicados:", error);
    }
  };

  useEffect(()=>{
    if (token) {
      const decoded = jwtDecode(token);
      handleUser(decoded);
      loadingNews();
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      window.location.href = "/";
    }
  },[comunicadosItems])

  return (
    <>
      <Header />
      <section className="home-page">
        <main>
          <section className="service-section">
            <h1 className="title">
              <img src={inicioIcon} alt="" /> Inicio
            </h1>
            <div className="service-content">
              {service_items.map((item, index) => (
                <HomeButton
                  className="home-button"
                  key={index}
                  Icon={item.Icon}
                  Title={item.Title}
                  Nav={item.Nav}
                />
              ))}
            </div>
          </section>
          <section className="comunicados-section">
            <div className="div-title">
              <h1 className="title">
                <img src={comunicadosIcon} alt="" /> Comunicados
              </h1>
              <input
                className="icon-button"
                type="button"
                value="Ver Todos"
                onClick={() => {
                  window.location.href = "/news";
                }}
              />
            </div>
            <div className="comunicados-content">
              {comunicadosItems
                .slice(-4)
                .reverse()
                .map((item, index) => (
                  <HomeCardComunicados
                    className="home-button"
                    key={index}
                    Title={item.titulo}
                    Desc={item.mensagem}
                  />
                ))}
            </div>
          </section>
        </main>
        <section className="aside">
          <div className="cards-div">
            <HomeCardOutlined
              Icon={apartamentoIcon}
              Title="Meu Apartamento"
              Desc={`Apt ${profileInfo.apartamento} | Blc ${profileInfo.bloco}`}
            />
            <HomeCardFilled
              Icon={condominioIcon}
              Title="Condominio"
              Desc={profileInfo.condominioNome}
            />
          </div>
          <HomeCardProfile
            Img={"https://cdn-icons-png.flaticon.com/512/847/847969.png"}
            UserName={profileInfo.nome}
            Cargo={profileInfo.tipoDoUsuario}
            CPF={profileInfo.cpf}
            Cellphone={profileInfo.telefone}
          />
        </section>
      </section>
    </>
  );
}
