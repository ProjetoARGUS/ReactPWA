/* eslint-disable react/prop-types */
import { useState } from "react";
import "./style.css";
import TextFieldInput from "../TextFieldInput";

export default function AssemblyForms({ Inputs, OnSubmit }) {
  const [formValues, setFormValues] = useState(
    Inputs.reduce((acc, input) => ({ ...acc, [input.Id]: "" }), {})
  );

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    OnSubmit(formValues); // Passa os valores do formulário ao OnSubmit
  };

  return (
    <div className="assembly-forms">
      <form onSubmit={handleSubmit}>
        <div className="inputs-container">
          {Inputs.map((input, index) =>
            input.Type !== "text" ? (
              input.Type !== "select" ? (
                <div key={index}>
                  <label htmlFor={input.Id}>{input.Label}</label>
                  <input
                    type={input.Type}
                    name={input.Id}
                    id={input.Id}
                    required={input.Require}
                    value={formValues[input.Id]}
                    onChange={handleInputChange}
                  />
                </div>
              ) : (
                <div key={index}>
                  <label htmlFor={input.Id}>{input.Label}</label>
                  <select
                    name={input.Id}
                    id={input.Id}
                    required={input.Require}
                    value={formValues[input.Id]}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione uma opção</option>
                    {input.Options &&
                      input.Options.map((option, optIndex) => (
                        <option
                          key={optIndex}
                          value={option
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/\s+/g, "-")}
                        >
                          {option}
                        </option>
                      ))}
                  </select>
                </div>
              )
            ) : (
              <TextFieldInput
                key={index}
                Id={input.Id}
                Label={input.Label}
                Value={formValues[input.Id]}
                OnChange={handleInputChange}
              />
            )
          )}
        </div>
        <div className="form-buttons">
          <button type="submit">Enviar</button>
          <button type="reset" onClick={() => {setFormValues(
            Inputs.reduce((acc, input) => ({ ...acc, [input.Id]: "" }), {})
          );
          window.location.href="/home"
        }}>Limpar</button>
        </div>
      </form>
    </div>
  );
}
