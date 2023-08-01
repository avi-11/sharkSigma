export const customStyles = {
  option: (provided) => ({
    ...provided,
    backgroundColor: "white",
    color: "black",
    cursor: "pointer",
  }),
  control: () => ({
    display: "flex",
    border: "2px solid #1e2126",
    width: "100%",
  }),
  singleValue: (provided) => {
    const transition = "opacity 300ms";

    return { ...provided, transition };
  },
};
