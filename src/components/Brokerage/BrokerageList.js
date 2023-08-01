import React, { useState } from "react";
import zerodha from "./img/zerodha.png";
import styles from "./brokerage.module.css";
import add from "./img/add.png";

function BrokerageList({ brokerages, process, setProcess }) {
  return (
    <div>
      <div>
        <h1
          style={{ fontSize: "calc(1.375rem + 1.5vw)" }}
          className={styles.BrokerageList_itemName}
        >
          <span style={{ color: "#94C843" }}>Active</span> Brokerages
        </h1>
        <div className={styles.BrokerageList_activeBrokerages}>
          <div className={styles.BrokerageList_activeItems}>
            <img src={zerodha} />
            <h3 className={styles.BrokerageList_itemName}>Zerodha</h3>
          </div>
          <div className={styles.BrokerageList_activeItems}>
            <img src={zerodha} />
            <h3 className={styles.BrokerageList_itemName}>Zerodha</h3>
          </div>
        </div>
      </div>
      <div>
        <h3
          style={{ fontSize: "calc(1.2rem + 1vw)" }}
          className={styles.BrokerageList_itemName}
        >
          Connect with the list of{" "}
          <span style={{ color: "#9989FB" }}>brokerages</span>
        </h3>
        <div className={styles.BrokerageList_InactiveBrokerages}>
          <div>
            <div className={styles.BrokerageList_InactiveItems}>
              <img src={zerodha} />
              <h3 className={styles.BrokerageList_itemName}>Zerodha</h3>
            </div>
            <div className={styles.BrokerageList_addBrokerage}>
              <img style={{ height: "1rem" }} src={add} />
              <p
                onClick={() => setProcess("Login")}
                style={{ color: "white", margin: "0 12px" }}
              >
                Add Brokerage
              </p>
            </div>
          </div>
          <div>
            <div className={styles.BrokerageList_InactiveItems}>
              <img src={zerodha} />
              <h3 className={styles.BrokerageList_itemName}>Zerodha</h3>
            </div>
            <div className={styles.BrokerageList_addBrokerage}>
              <img style={{ height: "1rem" }} src={add} />
              <p
                onClick={() => setProcess("Login")}
                style={{ color: "white", margin: "0 12px" }}
              >
                Add Brokerage
              </p>
            </div>
          </div>
          <div>
            <div className={styles.BrokerageList_InactiveItems}>
              <img src={zerodha} />
              <h3 className={styles.BrokerageList_itemName}>Zerodha</h3>
            </div>
            <div className={styles.BrokerageList_addBrokerage}>
              <img style={{ height: "1rem" }} src={add} />
              <p
                onClick={() => setProcess("Login")}
                style={{ color: "white", margin: "0 12px" }}
              >
                Add Brokerage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrokerageList;
