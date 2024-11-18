import './style.css';

/* eslint-disable react/prop-types */
export default function CheckBoxInput({ Id, Name, Label, Require }){
    return (
        <>
            {Require ?
                <div>
                    <input type="checkbox" id={Id} name={Name} value={Id} required/>
                    <label htmlFor={Id}>{Label}</label>
                </div>
                :
                <div>
                    <input type="checkbox" id={Id} name={Name} value={Id} />
                    <label htmlFor={Id}>{Label}</label>
                </div>
            }
        </>
    )
}