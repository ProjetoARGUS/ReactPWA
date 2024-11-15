/* eslint-disable react/prop-types */
import './style.css';

export default function HomeCardFilled({ Title, Icon, Desc }) {
    return (
        <div className="card-filled-container">
            <div className="icon-container">
                <div className="icon-overlay"></div>
                <div className="icon"><img src={Icon} alt="icone" /></div>
            </div>
            <div className="card-text">{Title}<br/>{Desc}</div>
        </div>
    );
}
