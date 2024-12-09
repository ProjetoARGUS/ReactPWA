import './style.css';
import OrderIcon from '../../assets/HomeIcons/encomendas.svg';

export default function OrderCard({ order }) {
    return (
        <div className="order-card">
            <div className="order-code">
                <div className="icon-placeholder">
                    <img src={OrderIcon} alt="icon-placeholder"/>
                </div>
                <div>
                    <p className="code-number">{order.id}</p>
                    <p className="code-text">Código de retirada</p>
                </div>
            </div>
            <div className="order-details">
                <p>
                    <strong>Tipo:</strong>
                    <span>{order.type}</span>
                </p>
                <p>
                    <strong>Destinatário:</strong>
                    <span>{JSON.parse(localStorage.getItem("currentUser")).nome}</span>
                </p>
                <p>
                    <strong>Número de registro:</strong>
                    <span>{order.registerNumber}</span>
                </p>
                <p>
                    <strong>Hora do recebimento:</strong>
                    <span>{order.receivedTime}</span>
                </p>
                <p>
                    <strong>Recebido por:</strong>
                    <span>{order.receivedBy}</span>
                </p>
                <p>
                    <strong>Descrição:</strong>
                    <span>{order.description}</span>
                </p>
            </div>
        </div>
    );
}