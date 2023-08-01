import XLSX from "xlsx";
import ExportBasketData from "./AssetComponent/ExportBasketData/ExportBasketData";

function PredefinedBasketsSidebar({ companyName, instCount, ticker }) {
  // Download the predefined-basket details in excel format
  const downloadXlsx = () => {
    const Heading = [["Ticker", "Instrument", "Country"]];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, Heading);

    //Starting in the second row to avoid overriding and skipping headers
    XLSX.utils.sheet_add_json(ws, ticker, { origin: "A2", skipHeader: true });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, `${companyName.toUpperCase()}.xlsx`);
  };

  return (
    <aside className="predefinedBaskets__info">
      <div className="predefinedBaskets__info--header">
        <div style={{ textAlign: "left" }}>
          <p style={{ color: "#0B81EE" }}>BASKET DETAILS</p>
          <h5
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {companyName.toUpperCase()}
          </h5>
          <label style={{ textAlign: "left" }}>{instCount} instruments</label>
        </div>

        <ExportBasketData
          data={ticker}
          fileName={companyName}
          downloadXlsx={downloadXlsx}
          headers={["Ticker", "Instrument", "Country"]}
        />
      </div>

      <div className="predefinedBaskets__info--main">
        <div
          style={{
            marginBottom: "1rem",
            fontWeight: "800",
            fontSize: "1.5rem",
            color: "white",
          }}
        >
          <h6>Ticker</h6>
          <h6>Instrument</h6>
        </div>
        {ticker.map((tickerName) => (
          <div>
            <label>{tickerName["0"]}</label>
            <p
              style={{
                paddingTop: "15px",
                alignItems: "right",
                textAlign: "right",
              }}
            >
              {tickerName["1"]}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default PredefinedBasketsSidebar;
