import "./style.css";

export default function LoginPage() {
  return (
    <>
      <section className="login-page">
        <div className="login-forms">
          <div className="logo-container">
            <img className="logo" src="/logo1.png" alt="argus" />
            <h1 className="logo-name">ARGUS</h1>
          </div>
          <p className="description poppins-bold">
            Olá!
            <br />
            Para continuar, digite seu CPF e senha.
          </p>
          <form action="" method="post">
            <input
              className="poppins-semibold"
              type="text"
              id="cpf"
              name="cpf"
              placeholder="CPF*"
              required
            />
            <input
              className="poppins-semibold"
              type="password"
              id="password"
              name="password"
              placeholder="Senha*"
              required
            />

            <div className="additional-options">
              <div>
                <input type="checkbox" id="remember" name="remember" />
                <label className="poppins-regular" htmlFor="remember">
                  Lembrar Senha
                </label>
              </div>
              <a href="/recovery">
                <p>Esqueci minha senha</p>
              </a>
            </div>

            <a href="/home">
              <input className="button" type="button" value="ENTRAR" />
            </a>
          </form>

          {/* Link de cadastro */}
          <div className="register-link">
            <p className="poppins-regular">
              Ainda não tem uma conta? <a href="/register">Cadastre-se</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
