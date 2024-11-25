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
        Genero: "masculino",
        Idade: 30,
    });

    const [emergencyContacts, setEmergencyContacts] = useState({
        Pessoa_1: "Maria",
        Telefone_1: "(81) 92345-6789",
        Pessoa_2: "Carlos",
        Telefone_2: "(81) 98765-4321",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('contact') || name.startsWith('phone')) {
            setEmergencyContacts((prev) => ({ ...prev, [name]: value }));
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
            console.log("Informações salvas:", { userInfo, emergencyContacts });
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
                                {key === "gender" ? (
                                    <select
                                        id={key}
                                        name={key}
                                        value={userInfo[key]}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Selecione uma opção</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                ) : (
                                    <input
                                        id={key}
                                        name={key}
                                        type={key === "age" ? "number" : "text"}
                                        value={userInfo[key]}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="emergency-contacts">
                        <h2>Contatos de Emergência</h2>
                        {Object.keys(emergencyContacts).map((key, index) => (
                            <div key={index} className="field-container">
                                <label htmlFor={key}>{formatLabel(key)}</label>
                                <input
                                    id={key}
                                    name={key}
                                    type="text"
                                    value={emergencyContacts[key]}
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
