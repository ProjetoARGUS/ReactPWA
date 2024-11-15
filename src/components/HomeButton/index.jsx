/* eslint-disable react/prop-types */
import './style.css';

export default function HomeButton({ Title, Icon }) {
    return (
        <div className="button-container">
            <div className="icon-container">
                <div className="icon-overlay"></div>
                <div className="icon"><img src={Icon} alt="icone" /></div>
            </div>
            <div className="button-text">{Title}</div>
        </div>
    );
}
