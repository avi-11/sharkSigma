import React from "react";
import "../../App.css";
import styles from "./Lens.module.css";
import Dropdown from "../Baskets/PredefinedBaskets/AssetComponent/Dropdown/Dropdown";
import { useState } from "react";
import logo from "./assets/Vector.svg";

const LensStarter = ({ marketName, Instrument, frequency, getDataLens }) => {
  return (
    <div
      className={styles.lens_first_open}
      style={{ top: "25%", alignItems: "center" }}
    >
      <h1>
        <span>
          <img
            style={{
              marginRight: "1rem",
              width: "2rem",
              marginBottom: "4px",
            }}
            src={logo}
          />
        </span>
        Lens
      </h1>
      <p>Market scanner to identify high probability set-ups</p>
      <div className={styles.lens_first_dropdown}>
        <Dropdown
          currentValue=""
          setCurrentMarketValue={(e) => {}}
          values={marketName}
          setValue={(e) => {}}
        />
        <Dropdown
          currentValue=""
          setCurrentMarketValue={(e) => {}}
          values={Instrument}
          setValue={(e) => {}}
        />
        <Dropdown
          currentValue=""
          setCurrentMarketValue={(e) => {}}
          values={frequency}
          setValue={(e) => {}}
        />
      </div>
      <div>
        <button
          className={styles.lens_first_start}
          onClick={(e) => getDataLens()}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default LensStarter;
