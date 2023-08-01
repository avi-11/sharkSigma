import { useState, useRef } from "react";
import "./ScannerForm.css";

function ScannerForm(props) {
  const scannerName = useRef(props.scannerName);
  const basket = useRef();
  const timeFrame = useRef();

  const [baseFile, setBaseFile] = useState("hello");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadFile = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertBase64(file);
    console.log("base64");
    console.log(base64);
    setBaseFile(base64);
    console.log(baseFile);
    return base64;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      scannerName.current.value === "" ||
      basket.current.value === "" ||
      timeFrame.current.value === "" ||
      document.getElementById("scanner file").value === ""
    ) {
      alert("There is some error in the form,Please Check!!!");
      return;
    }
    if (props.IsEditActive) {
      let newData = {
        scannername: scannerName.current.value,
        scannercode: baseFile,
      };
      props.dataEditor(newData);
      props.editActiveSetter(false);
    } else {
      let newData = {
        scannername: scannerName.current.value,
        scannercode: baseFile,
      };
      props.addRow(newData);
      console.log(newData.scannername);
    }
    scannerName.current.value = "";
    basket.current.value = "";
    timeFrame.current.value = "";
    document.getElementById("scanner file").value = "";
  };

  return (
    <div className="form_card">
      <form onSubmit={onSubmitHandler}>
        <div className="scanner_form">
          <div>
            <label>Scanner Name</label>
            <input
              placeholder="Name you Scanner"
              type="text"
              id="scanner name"
              ref={scannerName}
            ></input>
          </div>
          <div className="upload_file">
            <label>Scanner File</label>
            <input
              placeholder="Upload File"
              id="scanner file"
              type="file"
              onChange={(e) => {
                uploadFile(e);
              }}
            ></input>
          </div>
          <div>
            <label>Basket</label>
            <input
              placeholder="Select Basket"
              type="text"
              list="baskets"
              id="Baskets"
              ref={basket}
            ></input>
            <datalist id="baskets">
              <option value="Basket1" />
              <option value="Basket2" />
            </datalist>
          </div>
          <div>
            <label>Timeframe</label>
            <input
              placeholder="Select Timeframe"
              type="text"
              list="Timeframe"
              id="timeframe"
              ref={timeFrame}
            ></input>
            <datalist id="Timeframe">
              <option value="Timeframe1" />
              <option value="Timeframe2" />
            </datalist>
          </div>
        </div>
        <div className="scanner_form_button">
          <button type="submit" className="save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ScannerForm;
