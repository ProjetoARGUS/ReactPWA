import "./style.css";
import TextFieldInput from "../TextFieldInput";

export default function AssemblyForms({ FormType, Inputs }) {
  return (
    <div className="assembly-forms">
      <form action="">
        <div className="inputs-container">
          {Inputs.map((input, index) =>
            input.Type !== "text" ? (
              input.Type === "date" ? (
                <div key={index}>
                  <label htmlFor={input.Id}>{input.Label}</label>
                  <input
                    type="date"
                    name={input.Id}
                    id={input.Id}
                    required={input.Require}
                  />
                </div>
              ) : (
                <div key={index}>
                  <label htmlFor={input.Id}>{input.Label}</label>
                  <select
                    name={input.Id}
                    id={input.Id}
                    required={input.Require}
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
              <TextFieldInput key={index} Id={input.Id} Label={input.Label} />
            )
          )}
        </div>
        <div className="form-buttons">
          <button type="submit">Enviar</button>
          <button type="reset">Limpar</button>
        </div>
      </form>
    </div>
  );
}
