/* eslint-disable react/prop-types */
export default function CheckBoxInput({ Id, Name, Label, OnChange, Checked, Require }){
    return (
        <>
            {Require ?
                <div>
                    <input type="checkbox" id={Id} name={Name} value={Id} onChange={OnChange} checked={Checked} required/>
                    <label htmlFor={Id}>{Label}</label>
                </div>
                :
                <div>
                    <input type="checkbox" id={Id} name={Name} value={Id} onChange={OnChange} checked={Checked} />
                    <label htmlFor={Id}>{Label}</label>
                </div>
            }
        </>
    )
}