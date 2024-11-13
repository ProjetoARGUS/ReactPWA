/* eslint-disable react/prop-types */
import './style.css';

export default function HomeSection({ Title, Content }){
    return(
        <>
            <section className='section'>
                <div className="section-title"><h2>{Title}</h2></div>
                    <div className="section-content">
                        {Content}
                    </div>
            </section>
        </>
    )
}