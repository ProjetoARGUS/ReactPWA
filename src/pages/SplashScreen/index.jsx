import { useEffect } from 'react';
import './style.css'

export default function SplashScreen(){
    useEffect(()=>{
        if (localStorage.getItem("currentUser")) {
            window.location.href = "/home";
        } else {
            window.location.href = "/login";
        }
      },[])

    return(
        <>
            <section className="splash-screen-page">
                <img src="/logo1.png" alt="Argus" />
            </section>
        </>
    )
}