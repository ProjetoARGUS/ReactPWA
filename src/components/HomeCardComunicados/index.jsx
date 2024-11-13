/* eslint-disable react/prop-types */
import './style.css';

export default function HomeCardComunicados({ Img, Title, Desc }) {
    return (
        <div className="card-comunicados-container">
            <img src={Img} alt="Imagem" />
            <div className="card-text"><span>{Title}</span><br/>{Desc}</div>
        </div>
    );
}
