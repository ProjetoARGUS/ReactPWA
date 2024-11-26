import './style.css';

export default function RegisterPage() {
    return (
        <section className="recovery-cod">
            <div className="recovery-container">
                <div className="logo-container">
                    <img className="logo" src="/logo1.png" alt="ARGUS" />
                </div>
                <h1 className="logo-name">ARGUS</h1>
                <p className="description">
                    Bem-vindo! Preencha seus dados para criar sua conta e aproveitar todos os benefícios.
                </p>
                <form>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Usuário"
                        className="input-field"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Senha"
                        className="input-field"
                        required
                    />
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="Confirme sua senha *"
                        className="input-field"
                        required
                    />
                    <select
                        id="role"
                        name="role"
                        className="input-field"
                        required
                    >
                        <option value="" disabled selected>
                            Cargo  
                        </option>
                        <option value="user">Usuário</option>
                        <option value="sind">Síndico</option>
                        <option value="sub-sind">Sub-Síndico</option>
                        <option value="admin">Administrador</option>

                    </select>
                    <button onClick={()=> {window.location.href="/login"}} type="submit" className="submit-button">
                        Cadastrar-se
                    </button>
                </form>
            </div>
        </section>
    );
}
