import "./style.css";
import Header from "../../components/Header";
import HomeButton from "../../components/HomeButton";
import HomeCardOutlined from "../../components/HomeCardOutlined";
import HomeCardFilled from "../../components/HomeCardFilled";
import HomeCardProfile from "../../components/HomeCardPerfil";

import moradora from "/moradora.png";
import inicioIcon from "../../assets/HomeIcons/inicio.svg";
import manutencaoIcon from "../../assets/HomeIcons/manutencao.svg";
import chatIcon from "../../assets/HomeIcons/chat.svg";
import financeiroIcon from "../../assets/HomeIcons/financeiro.svg";
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

import comunicado1 from "../../assets/ComunicadosImg/comunicado1.png";
import comunicado2 from "../../assets/ComunicadosImg/comunicado2.png";
import comunicado3 from "../../assets/ComunicadosImg/comunicado3.png";
import comunicado4 from "../../assets/ComunicadosImg/comunicado4.png";

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
    { Icon: financeiroIcon, Title: "Financeiro", Nav: "/financial" },
    { Icon: encomendasIcon, Title: "Encomendas", Nav: "/order" },
    { Icon: faqIcon, Title: "Dúvidas (FAQ)", Nav: "/faq" },
    { Icon: conflitosIcon, Title: "Conflitos", Nav: "/mediation" },
    { Icon: perfilIcon, Title: "Perfil", Nav: "/profile" },
    { Icon: reservasIcon, Title: "Reservas", Nav: "/reservations" },
    { Icon: assembleiaIcon, Title: "Assembleia", Nav: "/assembly" },
    { Icon: regrasIcon, Title: "Regras", Nav: "/rules" },
  ];

  const token = localStorage.getItem("authToken");

  const handleUser = async (decoded) => {
    try {
      const response = await axios.get(`/spring/usuarios/cpf/${decoded.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(response.data);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
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

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      handleUser(decoded);
      setProfileInfo({
        id: currentUser.id,
        nome: currentUser.nome,
        cpf: jwtDecode(token).sub,
        senha: currentUser.senha,
        bloco: currentUser.bloco,
        apartamento: currentUser.apartamento,
        condominioNome: currentUser.condominioNome,
        telefone: currentUser.telefone,
        tipoDoUsuario: currentUser.tipoDoUsuario,
      });
      loadingNews();
    } else {
      window.location.href = "/login";
    }
  }, []);

  const loadingNews = async () => {
    try {
      const response = await axios.get("/spring/comunicado", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Adicione este cabeçalho, se necessário
        },
      });
      setComunicadosItems(response.data); // Atualiza o estado com os dados da API
    } catch (error) {
      console.error("Erro ao carregar comunicados:", error);
    }
  };

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
            Img={moradora}
            UserName={profileInfo.nome}
            Level="10"
            XP="698"
            CPF={profileInfo.cpf}
            Cellphone={profileInfo.telefone}
          />
        </section>
      </section>
    </>
  );
}
