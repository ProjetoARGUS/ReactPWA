import './style.css';

export default function RecoveryKeyPage() {
    return (
        <section className="recovery-cod">
            <div className="recovery-container">
                <div className="logo-container">
                    <img className="logo" src="/logo1.png" alt="argus" />
                    <h1 className="logo-name">ARGUS</h1>
                </div>
                <p className="description poppins-bold">
                    Informe o código de acesso enviado para o seu telefone cadastrado!
                </p>
                <form>
                    <label htmlFor="access-code" className="form-label">Código de Acesso*</label>
                    <input
                        type="text"
                        id="access-code"
                        name="access-code"
                        placeholder="Código de Acesso*"
                        className="input-field"
                        required
                    />

                    <label htmlFor="new-password" className="form-label">Nova Senha*</label>
                    <input
                        type="password"
                        id="new-password"
                        name="new-password"
                        placeholder="Nova Senha*"
                        className="input-field"
                        required
                    />

                    <label htmlFor="confirm-password" className="form-label">Confirme Nova Senha*</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="Confirme Nova Senha*"
                        className="input-field"
                        required
                    />

                    <button type="submit" className="submit-button">Recuperar</button> 
                </form>
            </div>
        </section>
    );
}

