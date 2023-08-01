import NumberFormat from "react-number-format";

export default function NumberInput({ value, setValue, thousandSeparator }) {
  function changeValue(value) {
    setValue(value);
  }

  return (
    <>
      <NumberFormat
        thousandSeparator={thousandSeparator}
        value={value}
        onValueChange={changeValue}
      />
    </>
  );
}
