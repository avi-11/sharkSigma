import { useState } from "react";
import XLSX from "xlsx";
import { useCSVReader } from "react-papaparse";

import myStyles from "./UploadCSV.module.css";
import {
  styles,
  REMOVE_HOVER_COLOR_LIGHT,
  DEFAULT_REMOVE_HOVER_COLOR,
} from "./JS_Styles/UploadCSVStyles";

import downloadIcon from "../assets/downloadIcon.svg";
import csvFileIcon from "../assets/csvFileIcon.svg";

const UploadCSV = ({
  setBasketName,
  setMarket,
  setMultiSelected,
  closeCreateBasketForm,
  setUploadCSV,
  usmidcapMarketInstruments,
  ussmallcapMarketInstruments,
  uslargecapMarketInstruments,
  indiaMarketInstruments,
}) => {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );

  const [fileUploaded, setFileuploaded] = useState("");
  const [fileDataErrors, setFileDataErrors] = useState("");

  const checkHeaders = (data) => {
    // Checks the file uploaded
    // Condition to check:
    // The file has a minimum of 3 headers ["name of basket", "market", "list of instruments"]

    if (data.length !== 3) setFileDataErrors("Invalid number of headers");
    else if (data[0].toLowerCase() !== "name of basket")
      setFileDataErrors("First Column Should be the Name of Basket");
    else if (data[1].toLowerCase() !== "market")
      setFileDataErrors("Second Column Should have Market");
    else if (data[2].toLowerCase() !== "list of instrument")
      setFileDataErrors("Third Column Should have List of Instrument");
    else return true;
  };

  const parseFile = (file) => {
    // Updates the state according to the data in the excel file.

    const fileInfo = file.data;
    let basketName;
    let instrumentNames = [];
    let marketName;

    if (checkHeaders(file.data[0])) {
      for (let i = 1; i < fileInfo.length; i++) {
        instrumentNames.push(fileInfo[i][2]);
        marketName = fileInfo[i][1] ? fileInfo[i][1] : marketName;
        basketName = fileInfo[i][0] ? fileInfo[i][0] : basketName;
      }

      setBasketName(basketName);
      setMarket(marketName);

      let instrumentForMarket;

      if (marketName === "US Small Cap")
        instrumentForMarket = ussmallcapMarketInstruments;
      else if (marketName === "US Mid Cap")
        instrumentForMarket = usmidcapMarketInstruments;
      else if (marketName === "US Large Cap")
        instrumentForMarket = uslargecapMarketInstruments;
      else if (marketName === "India")
        instrumentForMarket = indiaMarketInstruments;

      let tickerForInstruments = [];

      // Checks if the instruments in the file are valid instruments for the market
      // Works with both ticker symbols or instrument names
      instrumentForMarket.forEach((currentInstrument) => {
        if (
          instrumentNames.includes(currentInstrument[0]) ||
          instrumentNames.includes(currentInstrument[1])
        ) {
          tickerForInstruments.push(currentInstrument[0]);
        }
      });

      setMultiSelected(tickerForInstruments);
      setFileuploaded(true);
      setUploadCSV(true);
    } else {
      console.log("Check Headers for CSV File");
      setFileuploaded(false);
    }
  };

  const downloadTemplate = () => {
    // Template for user to structure the CSV file according to their needs and then upload a correct version

    const Heading = [["Name of Basket", "Market", "List of Instrument"]];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, Heading);

    const data = [
      [
        "Enter name of basket in this column",
        "Enter the market to which all your instruments belong in this columns(!! Market name can be either US Small Cap, US Mid Cap, US Large Cap, and India. Also you cannot have multiple market names in one basket",
        "The name of instrument/ticker symbol goes in this column(AAPL or Apple)",
      ],
    ];

    XLSX.utils.sheet_add_json(ws, data, { origin: "A2", skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `SharkSigma_CreateBasketTemplate.csv`);
  };

  return (
    <div style={{ margin: "2rem " }}>
      <div className={myStyles.downloadTemplate}>
        <p>
          <img
            src={downloadIcon}
            alt="download template"
            onClick={downloadTemplate}
          />{" "}
          <span onClick={downloadTemplate}>Download CSV template</span>
        </p>
      </div>

      <CSVReader
        onUploadAccepted={(results) => {
          setZoneHover(false);

          parseFile(results);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setZoneHover(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setZoneHover(false);
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
          Remove,
        }) => (
          <>
            <div
              {...getRootProps()}
              style={Object.assign(
                {},
                styles.zone,
                zoneHover && styles.zoneHover
              )}
            >
              {acceptedFile ? (
                <>
                  <div style={styles.file}>
                    <div style={styles.info}>
                      <span style={styles.size}>
                        <img src={csvFileIcon} alt="" />
                      </span>

                      <span style={styles.name}>{acceptedFile.name}</span>

                      <div
                        {...getRemoveFileProps()}
                        style={styles.remove}
                        onMouseOver={(event) => {
                          event.preventDefault();
                          setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                        }}
                        onMouseOut={(event) => {
                          event.preventDefault();
                          setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                        }}
                      >
                        <Remove color={removeHoverColor} />
                      </div>
                    </div>
                    <div style={styles.progressBar}>
                      <ProgressBar />
                    </div>
                  </div>

                  <div style={{ marginTop: "1rem" }}>
                    {fileUploaded ? (
                      "File Uploaded Successsfully "
                    ) : (
                      <div style={{ color: "red", lineHeight: "1" }}>
                        <p>Failed to upload file. </p>
                        <ul>
                          <li>{fileDataErrors}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                "Drop CSV file here or click to upload"
              )}
            </div>
          </>
        )}
      </CSVReader>
    </div>
  );
};

export default UploadCSV;
