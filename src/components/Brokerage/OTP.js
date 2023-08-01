import React, { useState } from "react";
import styles from "./brokerage.module.css";

function OTP({ auth, setAuth }) {
  const [code, setcode] = useState(new Array(4).fill(""));

  const handleKey = (e, index) => {
    if (e.key === "Backspace") {
      setcode([...code.map((d, ind) => (ind == index ? "" : d))]);
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    } else {
      if (isNaN(e.target.value)) return false;
      setcode([...code.map((d, ind) => (ind == index ? e.target.value : d))]);
      if (e.target.nextSibling) {
        e.target.nextSibling.focus();
      }
    }
  };
  return (
    <center>
      <div className={styles.brokerage_otp}>
        <h2 style={{ color: "white" }}>Please enter OTP</h2>
        <p style={{ color: "#B5B5BA" }}>
          we have sent you one time password to your mobile
        </p>
        <p className={styles.brokerage_otpTimer}>3:00</p>
        <div>
          <input
            className={styles.otpInput}
            type="text"
            maxlength="1"
            id="txt1"
            onKeyUp={(e) => handleKey(e, 1)}
          />
          <input
            className={styles.otpInput}
            type="text"
            maxlength="1"
            id="txt1"
            onKeyUp={(e) => handleKey(e, 2)}
          />
          <input
            className={styles.otpInput}
            type="text"
            maxlength="1"
            id="txt1"
            onKeyUp={(e) => handleKey(e, 3)}
          />
          <input
            className={styles.otpInput}
            type="text"
            maxlength="1"
            id="txt1"
            onKeyUp={(e) => handleKey(e, 4)}
          />
        </div>
        <p style={{ color: "#B5B5BA" }}>
          didn't recieve otp? <span style={{ color: "#9989FB" }}>RESEND</span>
        </p>
        <p
          style={{
            color: "white",
            background: "#7962FA",
            padding: "0.7rem 2.5rem",
            borderRadius: "2rem",
            margin: "2rem 0",
          }}
          onClick={() => setAuth("verify")}
        >
          Verify
        </p>
      </div>
    </center>
  );
}

export default OTP;
