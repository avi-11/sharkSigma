import NumberInput from "../../assetComponents/input/numberInpus/NumberInput";

const ParameterModalInputFields = ({
  fieldName,
  inputType,
  value,
  currencyType,
  setData,
  error,
}) => {
  return (
    <div>
      <label style={{ color: `${error ? "#ff3b3b" : ""}` }} title={error}>
        {fieldName}
        {error ? (
          <span
            style={{
              marginLeft: "5px",
              backgroundColor: "#ff3b3b",
              color: "white",
              borderRadius: "50%",
              padding: "0.5px 3.5px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            !
          </span>
        ) : (
          ""
        )}
      </label>

      {inputType !== "number" ? (
        <input
          type={inputType}
          name={fieldName}
          value={value}
          onChange={setData}
          required
          checked={value ? true : false}
        />
      ) : (
        <NumberInput
          value={value}
          setValue={setData}
          thousandSeparator={true}
        />
      )}
      {currencyType === "" ? <></> : <span>{currencyType}</span>}
    </div>
  );
};

export default ParameterModalInputFields;
