import "../../font-styles.css";

/* eslint-disable react/prop-types */
export default function TextFieldInput({ Id,Label }){
    return (
        <>
            <div>
                <label className="poppins-bold" htmlFor={Id}>{Label}</label>
                <input type="text" id={Id} name={Id} required />
            </div>
        </>
    )
}