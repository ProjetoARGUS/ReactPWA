import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [condominiumInfo, setCondominiumInfo] = useState({});
    const token = localStorage.getItem("authToken");

    const handleUser = () => {
        try {      
          // Use currentUser diretamente aqui
          setUserInfo({
            senha: currentUser.senha,
            tipoDoUsuario: currentUser.tipoDoUsuario,
            id: currentUser.id,
            cpf: jwtDecode(token).sub,
            nome: currentUser.nome,
            telefone: currentUser.telefone,
          });
      
          setCondominiumInfo({
            condominioNome: currentUser.condominioNome,
            apartamento: currentUser.apartamento,
            bloco: currentUser.bloco,
          });
        } catch (error) {
          console.error("Error during request setup:", error.message);
        }
      };
      

    useEffect(() => {
        if (localStorage.getItem("currentUser") && JSON.stringify(currentUser) == '{}') {
            setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
            handleUser();
        } else if (JSON.stringify(currentUser) != '{}' && (JSON.stringify(condominiumInfo) === '{}' || JSON.stringify(userInfo) === '{}')){
            handleUser();
        } else if (!localStorage.getItem("currentUser")) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("currentUser");
            window.location.href = "/";
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name in condominiumInfo) {
            setCondominiumInfo((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setUserInfo((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };    

    const handleEditToggle = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                "nome": userInfo.nome,
                "cpf": userInfo.cpf,
                "senha": localStorage.getItem("currentPassword"),
                "telefone": userInfo.telefone,
                "tipoDoUsuario": currentUser.tipoDoUsuario,
                "bloco": condominiumInfo.bloco,
                "apartamento": parseInt(condominiumInfo.apartamento),
                "condominio": {
                    "nome": condominiumInfo.condominioNome,
                },
            }
            console.log("Informações salvas:", formData, userInfo.id);
            const response = await axios.put(`http://18.228.153.53:8080/usuarios/${userInfo.id}`,
                formData,
                {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            console.log(response.data);
            setIsEditing(false);
            alert("Informações atualizadas com sucesso!");
            window.location.href="/home"
        } catch (error) {
            if (error.response) {
                console.error("API Error:", error.response);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error during request setup:", error.message);
            }
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        window.location.href="/home"
    };

    const formatLabel = (label) => {
        return label.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
    };

    return (
        <>
            <Header />
            <section className="profile-page">
                <h1>Perfil do Usuário</h1>
                <form className="profile-forms" onSubmit={handleSubmit}>
                    <h2>Informações Pessoais</h2>
                    <div className="fields-group">
                        {Object.keys(userInfo).slice(-2).map((key, index) => (
                            <div key={index} className="field-container">
                                <label htmlFor={key}>{formatLabel(key)}</label>
                                <input
                                    id={key}
                                    name={key}
                                    type={key === "age" ? "number" : "text"}
                                    value={userInfo[key]}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        ))}
                        {Object.keys(userInfo).slice(3, 4).map((key, index) => (
                            <div key={index} className="field-container">
                                <label htmlFor={key}>{formatLabel(key)}</label>
                                <input
                                    id={key}
                                    name={key}
                                    type={key === "age" ? "number" : "text"}
                                    value={userInfo[key]}
                                    onChange={handleChange}
                                    disabled={true}
                                />
                            </div>
                        ))}
                        {Object.keys(condominiumInfo).map((key, index) => (
                            <div key={index} className="field-container">
                                <label htmlFor={key}>{formatLabel(key)}</label>
                                <input
                                    id={key}
                                    name={key}
                                    type="text"
                                    value={condominiumInfo[key]}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        ))}
                        
                    </div>
                    <div className="buttons">
                        {isEditing ? (
                            <>
                                <button type="submit">Salvar Alterações</button>
                                <button type="reset" onClick={handleCancel}>Cancelar</button>
                            </>
                        ) : (
                            <input type="button" value="Editar" onClick={handleEditToggle}/>
                        )}
                    </div>
                </form>
            </section>
        </>
    );
}
