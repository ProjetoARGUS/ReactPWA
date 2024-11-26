import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import './style.css';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    const [userInfo, setUserInfo] = useState({
        Nome: "João",
        Sobrenome: "Silva",
        CPF: "000.000.000-00",
        Telefone: "(81) 91234-5678",
    });

    const [condominiumInfo, setCondominiumInfo] = useState({
        Condominio: "Encanta Moça I",
        Apartamento: "407",
        Bloco: "2",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('contact') || name.startsWith('phone')) {
            setCondominiumInfo((prev) => ({ ...prev, [name]: value }));
        } else {
            setUserInfo((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleEditToggle = () => {
        setIsEditing(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            console.log("Informações salvas:", { userInfo, condominiumInfo });
            setIsEditing(false);
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false); // Sai do modo edição sem salvar
    };

    const formatLabel = (label) => {
        return label.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
    };

    useEffect(() => {
        console.log("isEditing atualizado:", isEditing);
    }, [isEditing]);

    return (
        <>
            <Header />
            <section className="profile-page">
                <h1>Perfil do Usuário</h1>
                <form className="profile-forms" onSubmit={handleSubmit}>
                    <h2>Informações Pessoais</h2>
                    <div className="fields-group">
                        {Object.keys(userInfo).map((key, index) => (
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
                    </div>
                    <div className="emergency-contacts">
                        <h2>Minha Casa</h2>
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
