import React from "react";

import styles from "./ProfileLayout.module.css";
import add from "./img/add.png";
import edit from "./img/edit.png";
import close from "./img/close.png";

function AccountSettings() {
  return (
    <div style={{ paddingLeft: "6rem", marginTop: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "white",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ margin: "0" }}>Brokerages</h2>
        <p className={styles.addBro}>
          <span>
            <img style={{ margin: "0 8px" }} src={add} />
          </span>
          Add brokerage
        </p>
      </div>
      <div style={{ display: "flex", margin: "1rem" }}>
        <div
          className={styles.brokerageItem}
          style={{ color: "white", display: "flex" }}
        >
          <p style={{ margin: "0" }}>zerodha</p>
          <div style={{ margin: "0 16px" }}>
            <svg height="10" width="10">
              <circle cx="5" cy="5" r="4" stroke-width="3" fill="green" />
            </svg>
          </div>
        </div>
        <div
          className={styles.brokerageItem}
          style={{ color: "white", display: "flex" }}
        >
          <p style={{ margin: "0" }}>zerodha</p>
          <div style={{ margin: "0 16px" }}>
            <svg height="10" width="10">
              <circle cx="5" cy="5" r="4" stroke-width="3" fill="green" />
            </svg>
          </div>
        </div>
        <div
          className={styles.brokerageItem}
          style={{ color: "white", display: "flex" }}
        >
          <p style={{ margin: "0" }}>zerodha</p>
          <div style={{ margin: "0 16px" }}>
            <svg height="10" width="10">
              <circle cx="5" cy="5" r="4" stroke-width="3" fill="green" />
            </svg>
          </div>
        </div>
        <div
          className={styles.brokerageItem}
          style={{ color: "white", display: "flex" }}
        >
          <p style={{ margin: "0" }}>zerodha</p>
          <div style={{ margin: "0 16px" }}>
            <svg height="10" width="10">
              <circle cx="5" cy="5" r="4" stroke-width="3" fill="red" />
            </svg>
          </div>
        </div>
        <div
          className={styles.brokerageItem}
          style={{ color: "white", display: "flex" }}
        >
          <p style={{ margin: "0" }}>zerodha</p>
          <div style={{ margin: "0 16px" }}>
            <svg height="10" width="10">
              <circle cx="5" cy="5" r="4" stroke-width="3" fill="red" />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.brokerageTable}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <img style={{ margin: "0 1rem" }} src={edit} />
          <img src={close} />
        </div>
        <table style={{ width: "30rem", color: "white" }}>
          <tr>
            <td>Brokerage name</td>
            <td>:</td>
            <td>
              <div
                className={styles.brokerageItem}
                style={{
                  color: "white",
                  background: "#7962FA",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p style={{ margin: "0" }}>zerodha</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>API key</td>
            <td>:</td>
            <td>bcubf3bebjdb3b3k</td>
          </tr>
          <tr>
            <td>URL</td>
            <td>:</td>
            <td>www.figma.com</td>
          </tr>
          <tr>
            <td>Activation Mechanism</td>
            <td>:</td>
            <td>API key</td>
          </tr>
          <tr>
            <td>Expiry date</td>
            <td>:</td>
            <td>12/07/2023</td>
          </tr>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <input type="checkbox" id="default" name="defalut" />
            <label
              style={{ color: "#C7C8CC", margin: "0 0.5rem" }}
              for="vehicle1"
            >
              Make this default brokerage
            </label>
          </div>
          <div>
            <p
              style={{
                color: "white",
                background: "#7962FA",
                padding: "0.7rem 2.5rem",
                borderRadius: "2rem",
                margin: "2rem 0",
              }}
            >
              Done
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
