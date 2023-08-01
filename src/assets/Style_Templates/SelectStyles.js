export const reactSelectStyle = {
  // Input Container
  control: (provided, state) => ({
    ...provided,
    border: "0.4px solid rgba(142, 149, 155, 0.67)",
    borderRadius: "4px",
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#292C3D",
    "&:hover": {
      border: "0.4px solid #e0e0e0",
    },
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "0",
    color: "#CFCFCF",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0 12px",
    color: "#CFCFCF",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#CFCFCF",
  }),
  //   Changes the text color of the selected option
  singleValue: (provided, state) => ({
    ...provided,
    color: "#CFCFCF",
  }),

  // Option Container
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#CFCFCF" : "#232334",
    backgroundColor: state.isSelected ? "#363949" : "rgba(199, 200, 204, 0.1)",
    border: "0.4px solid rgba(142, 149, 155, 0.67)",
    "&:hover": {
      backgroundColor: "#363949",
      color: "#cfcfcf",
    },
  }),
  //   Changes the color of dropdown icon
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#CFCFCF",
  }),

  menu: (provided, state) => ({
    ...provided,
    borderRadius: "4px",
    boxShadow: "0 0 0 1px #e0e0e0",
    marginTop: "0",
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: "0",
  }),

  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none",
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: "#000",
  }),

  noOptionsMessage: (provided, state) => ({
    ...provided,
    padding: "8px 12px",
  }),
  loadingMessage: (provided, state) => ({
    ...provided,
    padding: "8px 12px",
  }),
};
