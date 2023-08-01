import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import dropdownArrow from "../../img/dropdownArrow.svg";

function Dropdown({
  currentValue,
  setCurrentMarketValue = () => {},
  values,
  setValue,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedvalue, setSelectedValue] = useState(currentValue);

  const setValues = (item) => {
    setSelectedValue(item);
    setValue(item);
    setCurrentMarketValue(item);
  };

  return (
    <div
      id="dropdown"
      className={styles.dropdown}
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <div className={styles.dropdown__select}>
        <p>{selectedvalue ? selectedvalue : "Select One"}</p>
        <img src={dropdownArrow} alt="" />
      </div>

      <div
        className={styles.dropdown__menu}
        style={{ display: `${dropdownOpen ? "" : "none"}` }}
      >
        {values.map((item) => (
          <p onClick={() => setValues(item)}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
