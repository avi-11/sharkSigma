import React from "react";
import Login from "./Login";
import { useState } from "react";
import BrokerageList from "./BrokerageList";
import Auth from "./Auth";

function Brokerage() {
  const [brokerages, setBrokerages] = useState([
    {
      name: "Zerodha",
      isActive: false,
    },
    {
      name: "Alpaca",
      isActive: false,
    },
    {
      name: "Coinbase",
      isActive: false,
    },
    {
      name: "Samco",
      isActive: false,
    },
    {
      name: "Binance",
      isActive: false,
    },
  ]);

  const [process, setProcess] = useState("start");

  return (
    <div>
      {process == "start" ? (
        <BrokerageList
          brokerages={brokerages}
          process={process}
          setProcess={setProcess}
        />
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default Brokerage;
