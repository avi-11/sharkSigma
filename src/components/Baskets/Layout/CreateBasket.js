import { useState } from "react";

import styles from "./CreateBasket.module.css";
import closeIcon from "../assets/closeIcon.svg";
import { customStyles } from "./JS_Styles/CreateBaskteStyles";

import CreateBasketForm from "./CreateBasketForm";
import UploadCSV from "./UploadCSV";

const CreateBasket = ({
  setBasketName,
  handleChange,
  handleMultiChange,
  createBasketHandler,
  markets,
  selectedMarket,
  basketName,
  multiSelected,
  setMultiSelected,
  setMarket,
  usmidcapMarketInstruments,
  ussmallcapMarketInstruments,
  uslargecapMarketInstruments,
  indiaMarketInstruments,
}) => {
  const [formOpen, setFormOpen] = useState(false);
  const [currentMarketValue, setCurrentMarketValue] = useState("");
  const [multipleSelect, setMultipleSelect] = useState([]); // Stores the selected instruments
  const [inputType, setInputType] = useState("Form");
  const [uploadCSV, setUploadCSV] = useState(false);

  const closeCreateBasketForm = () => {
    // Toggles the create basket form
    setFormOpen(false);
    setBasketName("");
    handleChange("");
    handleMultiChange("");
    setCurrentMarketValue("");
    setMultipleSelect([]);
    setInputType("Form");
  };

  const handleInstrumentChange = (e) => {
    // Handles the instruments dropdown changes in the create basket form
    handleMultiChange(e);
    setMultipleSelect(e);
  };

  const handleUploadTypeChange = (type) => {
    // Called when a input type is Excel sheet, and the file is uploaded.
    setBasketName("");
    setMultipleSelect([]);
    setInputType(type);
    setCurrentMarketValue("");
  };

  return (
    <div className={styles.createBasket}>
      {/* Action Button to create a new basket 
          Can be refactored into a new component if use case increases 
      */}
      <button
        className={styles.createBasket__Btn}
        onClick={() => setFormOpen(true)}
      >
        Create Basket
      </button>

      {/* Actual Create Basket Form */}
      <div
        style={{ display: `${formOpen ? "" : "none"}` }}
        className={styles.createBasket__form}
        onSubmit={createBasketHandler}
      >
        <div className={styles.createBasket__formHeader}>
          <div>
            <h4
              style={{ color: `${inputType === "Form" ? "white" : ""}` }}
              onClick={() => handleUploadTypeChange("Form")}
            >
              Create Basket
            </h4>
            <h4
              style={{ color: `${inputType === "File" ? "white" : ""}` }}
              onClick={() => handleUploadTypeChange("File")}
            >
              Upload File
            </h4>
          </div>

          <img src={closeIcon} alt="" onClick={closeCreateBasketForm} />
        </div>

        {inputType === "File" ? (
          <UploadCSV
            setBasketName={setBasketName}
            setMarket={setMarket}
            setMultiSelected={setMultiSelected}
            closeCreateBasketForm={closeCreateBasketForm}
            setUploadCSV={setUploadCSV}
            usmidcapMarketInstruments={usmidcapMarketInstruments}
            ussmallcapMarketInstruments={ussmallcapMarketInstruments}
            uslargecapMarketInstruments={uslargecapMarketInstruments}
            indiaMarketInstruments={indiaMarketInstruments}
          />
        ) : (
          <CreateBasketForm
            setBasketName={setBasketName}
            handleChange={handleChange}
            createBasketHandler={createBasketHandler}
            markets={markets}
            selectedMarket={selectedMarket}
            basketName={basketName}
            multipleSelect={multipleSelect}
            currentMarketValue={currentMarketValue}
            customStyles={customStyles}
            handleInstrumentChange={handleInstrumentChange}
            setCurrentMarketValue={setCurrentMarketValue}
            closeCreateBasketForm={closeCreateBasketForm}
            setMultipleSelect={setMultipleSelect}
          />
        )}

        <div className={styles.createBasket__actionButtons}>
          <button
            className={styles.createBasket__cancelBtn}
            type="button"
            onClick={closeCreateBasketForm}
          >
            Cancel
          </button>

          <button
            className={styles.createBasket__createBtn}
            onClick={(e) => {
              if (inputType === "Form" || (uploadCSV && inputType === "File")) {
                createBasketHandler(e);
                closeCreateBasketForm();
              }
            }}
            style={{
              cursor: `${
                !uploadCSV && inputType === "File" ? "not-allowed" : "pointer"
              }`,
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBasket;
