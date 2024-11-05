import './style.css'

export default function LoginPage(){
    return (
        <>
            <section className="login-page">
                <div className="logo-container">
                    <img src="/argus-icon.png" alt="Argus" className='icon'/>
                    <div className="text">
                        <h1 className='gradient'>ARGUS</h1>
                        <h1 className="stroke">ARGUS</h1>
                    </div>
                </div>
                <div className="login-forms">
                    <div>
                        <h2 className='title'>Acesse a Plataforma</h2>
                        <h4 className='description'>Faça o login ou registre-se para começar a<br/>administrar seu apartamento</h4>
                    </div>
                    <form action="" method="post">
                        <div className='fields-options'>
                            <label htmlFor="cpf">CPF*</label>
                            <input type="text" id="cpf" name="cpf" required/>
                        </div>
                        <div>
                            <label htmlFor="password">Senha*</label>
                            <input type="password" id="password" name="password" required/>
                        </div>

                        <div className='additional-options'>
                            <div>
                                <input type="checkbox" id="remember" name="remember"/>
                                <label htmlFor="remember">Lembrar Senha</label>
                            </div>
                            <a href="/forgot-password"><p>Esqueci minha senha</p></a>
                        </div>

                        <input className='button' type="button" value="ENTRAR" />
                    </form>
                </div>
            </section>
        </>
    )
}