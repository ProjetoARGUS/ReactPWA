import Header from "../../components/Header";
import "./style.css";

export default function FinancialPage() {
  const despesas = [
    {
      descricao: "Manutenção",
      data: "22/11/2024 às 13:00",
      valor: "R$ 20,00",
      status: "Em Aberto",
    },
    {
      descricao: "Conta de água",
      data: "20/11/2024 às 15:30",
      valor: "R$ 30,00",
      status: "Pago",
    },
    {
      descricao: "Conta de luz",
      data: "20/11/2024 às 15:30",
      valor: "R$ 30,00",
      status: "Pago",
    },
    {
      descricao: "Reformas",
      data: "10/11/2024 às 09:00",
      valor: "R$ 25,00",
      status: "Em Aberto",
    },
    {
      descricao: "Taxas condominiais",
      data: "01/11/2024 às 12:00",
      valor: "R$ 25,00",
      status: "Pago",
    },
  ];

  const totalPendencias = despesas
    .filter((despesa) => despesa.status === "Em Aberto")
    .reduce((total, despesa) => {
      const valorNumerico = parseFloat(
        despesa.valor.replace("R$", "").replace(",", ".")
      );
      return total + valorNumerico;
    }, 0);

  return (
    <>
      <Header />
      <div className="financial-page">
        <main className="main-content">
          <header className="welcome-header">
            <h2>Olá, Neide! Bem-vinda</h2>
          </header>
          <div className="summary">
            {/* Card de Taxas Pendentes */}
            <div className="summary-card">
              <p>Taxas Pendentes</p>
              <h3>R$ {totalPendencias.toFixed(2).replace(".", ",")}</h3>
            </div>
          </div>
          <section className="despesas">
            <h3>Despesas do condomínio</h3>
            <table className="despesas-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Data</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {despesas.map((despesa, index) => (
                  <tr key={index}>
                    <td>{despesa.descricao}</td>
                    <td>{despesa.data}</td>
                    <td
                      className={`valor ${
                        despesa.status === "Pago" ? "valor-pago" : "valor-em-aberto"
                      }`}
                    >
                      {despesa.valor}
                    </td>
                    <td className={`status ${
                      despesa.status === "Pago" ? "status-pago" : "status-em-aberto"
                    }`}>
                      {despesa.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </>
  );
}
