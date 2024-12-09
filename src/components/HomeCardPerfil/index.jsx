/* eslint-disable react/prop-types */
import './style.css';

export default function HomeCardOutlined({ Img, UserName, Cargo, CPF, Cellphone }) {
    return (
        <div className="card-profile">
            <h2>Meu Perfil</h2>
            <div className='title'>
                <img src={Img} alt="Imagem de perfil" />
                <h2><span className='span'>{UserName}</span></h2>
            </div>
            <p style={{marginTop: '10px'}}>Cargo: {Cargo}</p>
            <p>CPF: {CPF}</p>
            <p>Telefone: {Cellphone}</p>
        </div>
    );
}
