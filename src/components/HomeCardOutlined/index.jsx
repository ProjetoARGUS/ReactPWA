/* eslint-disable react/prop-types */
import './style.css';

export default function HomeCardOutlined({ Title, Icon, Desc }) {
    return (
        <div className="card-outlined-container">
            <div className="icon-container">
                <div className="icon-overlay"></div>
                <div className="icon">{Icon}</div>
            </div>
            <div className="card-text">{Title}<br/>{Desc}</div>
        </div>
    );
}
