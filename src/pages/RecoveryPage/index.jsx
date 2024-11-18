import "./style.css";

export default function RecoveryPage() {
  
  const handleInput = (e) => { // Função para permitir apenas números e restringir a quantidade de dígitos para 11
    
    e.target.value = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico

    
    if (e.target.value.length > 11) {
      e.target.value = e.target.value.slice(0, 11); // Limita a quantidade de caracteres a 11
    }

    
    if (e.target.value.length <= 2) {
      e.target.value = e.target.value.replace(/(\d{2})(\d{0,1})/, "($1) $2"); // Adiciona a formatação conforme o número de dígitos
    } else if (e.target.value.length <= 6) {
      e.target.value = e.target.value.replace(
        /(\d{2})(\d{5})(\d{0,1})/,
        "($1) $2-$3"
      );
    } else {
      e.target.value = e.target.value.replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3"
      );
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault(); // Função para verificar a quantidade de dígitos no telefone ao enviar o formulário

    const phoneNumber = e.target["phone-number"].value.replace(/\D/g, ""); // Remove caracteres não numéricos

   
    if (phoneNumber.length !== 11) {
      alert("Por favor, insira um número de telefone válido com 11 dígitos.");
      return;  // Valida se o número de telefone tem exatamente 11 dígitos
    }

    
   alert("Número de telefone válido! Código de verificação enviado.");
   window.location.href = '/recoveryKey';
  }; // Aqui você pode realizar o envio do formulário

  return (
    <section className="recovery-page">
      <div className="recovery-container">
        <div className="logo-container">
          <img className="logo" src="/logo1.png" alt="argus" />
          <h1 className="logo-name">ARGUS</h1>
        </div>
        <p className="description poppins-bold">
          Para redefinir sua senha, informe seu número de telefone cadastrado.
          Enviaremos um código de verificação para continuar o processo.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="phone-number" className="form-label">
            Informe o número cadastrado!
          </label>
          <input
            type="tel"
            id="phone-number"
            name="phone-number"
            placeholder="(XX) XXXXX-XXXX"
            className="input-field"
            inputMode="numeric"
            onInput={handleInput} // Adiciona a formatação enquanto digita
            required
          />
          <button type="submit" className="submit-button">
            enviar
          </button>
        </form>
      </div>
    </section>
  );
}
