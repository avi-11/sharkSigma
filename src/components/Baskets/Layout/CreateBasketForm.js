import Dropdown from "../PredefinedBaskets/AssetComponent/Dropdown/Dropdown";
import Select from "react-select";

const CreateBasketForm = ({
  setBasketName,
  handleChange,
  createBasketHandler,
  markets,
  selectedMarket,
  basketName,
  multipleSelect,
  currentMarketValue,
  customStyles,
  handleInstrumentChange,
  setCurrentMarketValue,
  closeCreateBasketForm,
  setMultipleSelect,
}) => {
  const handleMarketChange = (data) => {
    setMultipleSelect([]);
    setCurrentMarketValue(data);
  };

  return (
    <form>
      <div>
        <label>Basket Name</label>
        <input
          type="text"
          placeholder="Name Your Basket"
          value={basketName}
          onChange={(e) => setBasketName(e.target.value)}
        />
      </div>

      <div>
        <label>Select market</label>
        <div>
          <Dropdown
            currentValue={currentMarketValue}
            setCurrentMarketValue={handleMarketChange}
            values={markets}
            setValue={handleChange}
          />
        </div>
      </div>

      <div
        style={{
          display: `${
            selectedMarket.length > 0 && currentMarketValue !== ""
              ? "block"
              : "none"
          }`,
        }}
      >
        <label>Select Instruments</label>
        <Select
          value={multipleSelect}
          isMulti
          styles={customStyles}
          onChange={handleInstrumentChange}
          options={selectedMarket.map((item) => ({
            value: item[0],
            label: `${item[0]} - ${item[1]}`,
          }))}
        />
      </div>
    </form>
  );
};

export default CreateBasketForm;
