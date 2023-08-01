import React from "react";
import tick from "./img/verify.png";
import styles from "./brokerage.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Verify() {
  const [brokerage, setBrokerage] = useState(true);
  return (
    <center>
      <div className={styles.VerifyBox}>
        <img
          style={{
            background: "#7962FA",
            padding: "2rem",
            borderRadius: "50%",
          }}
          src={tick}
        />
        <h1 style={{ color: "white", marginTop: "2rem" }}>Verified</h1>
        <p style={{ color: "#C7C8CC", marginTop: "2rem" }}>
          Congratulations! your account is verified
        </p>
        <Link to="./profile" state={brokerage}>
          <p
            style={{
              color: "white",
              background: "#7962FA",
              padding: "0.7rem 2.5rem",
              borderRadius: "2rem",
              margin: "2rem 0",
            }}
          >
            OK
          </p>
        </Link>
      </div>
    </center>
  );
}

export default Verify;
