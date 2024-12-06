import { useState } from "react";
import "./style.css";
import axios from 'axios';

export default function LoginPage() {
  const [cpf, SetCpf] = useState('');
  const [senha, SetSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({cpf, senha})
  
    try {
      const response = await axios.post("/spring/auth/login", {
        "cpf": cpf,
        "password": senha,
      });

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        window.location.href="/home";
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "CPF ou senha inválidos. Tente novamente."
        );
      } else {
        setErrorMessage("Erro ao conectar com o servidor. Tente novamente mais tarde.");
      }
    }
  };
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
          <form onSubmit={handleSubmit} method="post">
            <input
              className="poppins-semibold"
              type="text"
              id="cpf"
              name="cpf"
              placeholder="CPF*"
              value={cpf}
              onChange={(e)=> {SetCpf(e.target.value)}}
              required
            />
            <input
              className="poppins-semibold"
              type="password"
              id="password"
              name="password"
              placeholder="Senha*"
              value={senha}
              onChange={(e)=> {SetSenha(e.target.value)}}
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

            <button className="button" type="submit">ENTRAR</button>
          </form>

          {/* Link de cadastro
          <div className="register-link">
            <p className="poppins-regular">
              Ainda não tem uma conta? <a href="/register">Cadastre-se</a>
            </p>
          </div> */}
        </div>
      </section>
    </>
  );
}
