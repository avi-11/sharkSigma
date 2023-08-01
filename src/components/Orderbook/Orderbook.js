import { useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Orderbook.module.css";
import OrderTable from "./OrderTable";
import Dropdown from "../Baskets/PredefinedBaskets/AssetComponent/Dropdown/Dropdown";

function Orderbook() {
  const location = useLocation();
  const data = location.state ? location.state : null;

  const tempData = {
    strategy_name: "Test123",
    strategy_id: "123",
    strategy_setting: {
      is_active: false,
    },
    brokerage_setting_id: "Zerodha",
    order_date: "2021-09-01",
    exchange: "NSE",
    type: "Buy",
    quantity: 100,
    entry_price: 100,
    target: 1000,
    pl_status: "Gain",
  };

  const [orderData, setOrderData] = useState(data ? [data] : [tempData]);

  return (
    <div>
      <div className={styles.order__header}>
        <div className={styles.order__header_heading}>
          <h3>Orderbook</h3>
          <p>Collection of your trade and performance per strategy</p>
        </div>
        <div className={styles.order_dropdown}>
          <Dropdown
            currentValue=""
            setCurrentMarketValue={(e) => {}}
            values={["US"]}
            setValue={(e) => {}}
          />
          <Dropdown
            currentValue=""
            setCurrentMarketValue={(e) => {}}
            values={["Gain"]}
            setValue={(e) => {}}
          />
          <Dropdown
            currentValue=""
            setCurrentMarketValue={(e) => {}}
            values={["Intra Day"]}
            setValue={(e) => {}}
          />
        </div>
      </div>
      <div className={styles.OrderTable}>
        <OrderTable orderData={orderData} />
      </div>
    </div>
  );
}

export default Orderbook;
