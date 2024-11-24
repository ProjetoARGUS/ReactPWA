/* eslint-disable react/prop-types */
import './style.css';

export default function NotificationUnit({ Icon, Title, Info, Time }){
    return(
        <>
            <div className="notification-unit">
                <div className="icon-container">
                    <div className="icon-overlay"></div>
                    <div className="icon"><img src={Icon} alt="icone" /></div>
                </div>
                <div className="notification-content">
                    <div>
                        <h2>{Title}</h2>
                        <p>{Info}</p>
                    </div>
                    <p>{Time}</p>
                </div>
            </div>
        </>
    )
}