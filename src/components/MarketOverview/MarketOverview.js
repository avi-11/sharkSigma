import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./MarketOverview.module.css";
import MarketOverviewCards from "./MarketOverviewCards";

import "../../App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function MarketOverview() {
  const empty = [];
  const [dayValue, setDayValue] = useState(["7D"]);
  const [currentDayData, setCurrentDayData] = useState([]);
  const [currentDayDataInd, setCurrentDayDataInd] = useState([]);
  const [currentDayDataUS, setCurrentDayDataUS] = useState([]);

  const { country } = useSelector((state) => state.region);

  useEffect(() => {
    fetchData();
  }, []);

  console.log(country.country);

  const fetchData = async () => {
    const tempDataUS = [];
    const tempDataInd = [];

    if (country.country === "US") {
      await axios
        .get(
          "https://o0j508lnig.execute-api.us-east-2.amazonaws.com/V1/market-overview"
        )
        .then((res) => {
          console.log(res);
          tempDataUS.push(res.data);
        })
        .catch((err) => console.log(err.message));

      if (tempDataUS.length > 0) {
        setCurrentDayData(Object.values(tempDataUS[0]));
        setCurrentDayDataUS(Object.values(tempDataUS[0]));
        console.log(Object.values(tempDataUS[0]));
      }
    } else if (country.country === "India") {
      try {
        await axios
          .get(
            "https://o0j508lnig.execute-api.us-east-2.amazonaws.com/V1/market-overview-ind"
          )
          .then((res) => {
            tempDataInd.push(res.data);
          })
          .catch((err) => console.log(err.message));

        setCurrentDayDataInd(Object.values(tempDataInd[0]));
      } catch (error) {
        toast.error("Failed to fetch data");
        console.log(error);
      }
    } else if (country.country === "Crypto") {
      toast.warn("Crypto Data not available");
    } else {
      await axios
        .get(
          "https://o0j508lnig.execute-api.us-east-2.amazonaws.com/V1/market-overview"
        )
        .then((res) => {
          console.log(res);
          tempDataUS.push(res.data);
        })
        .catch((err) => console.log(err.message));

      if (tempDataUS.length > 0) {
        setCurrentDayData(Object.values(tempDataUS[0]));
        setCurrentDayDataUS(Object.values(tempDataUS[0]));
        console.log(Object.values(tempDataUS[0]));
      }
    }
  };

  const countryChange = (country) => {
    if (country === "US") {
      setCurrentDayData(currentDayDataUS);
    } else if (country === "India") {
      setCurrentDayData(currentDayDataInd);
    }
  };

  const dayChange = (day) => {
    if (day === "90D") {
      setDayValue("90D");
    } else if (day === "60D") {
      setDayValue("60D");
    } else if (day === "30D") {
      setDayValue("30D");
    } else if (day === "7D") {
      setDayValue("7D");
    } else if (currentDayData > 0) {
      setDayValue("30D");
    }
  };

  return (
    <div className={styles.marketOverview__main}>
      {/* Toggle Buttons - Time Period */}
      <ToastContainer />
      <div className={styles.marketOverview__main_top}>
        <h2 className={styles.marketOverview__heading}>
          Global Market Overview
        </h2>
        <div className={styles.toggleTimePeriod}>
          <input
            type="radio"
            value="1D"
            id="oneDay"
            name="day"
            onChange={(e) => dayChange("7D")}
          />
          <label htmlFor="oneDay">1D</label>

          <input
            type="radio"
            value="7D"
            id="sevenDay"
            name="day"
            onChange={(e) => dayChange("7D")}
            defaultChecked
          />
          <label htmlFor="sevenDay">7D</label>

          <input
            type="radio"
            value="30D"
            id="thirtyDay"
            name="day"
            onChange={(e) => dayChange("30D")}
          />
          <label htmlFor="thirtyDay">30D</label>

          <input
            type="radio"
            value="60D"
            id="sixtyDay"
            name="day"
            onChange={(e) => dayChange("60D")}
          />
          <label htmlFor="sixtyDay">60D</label>

          <input
            type="radio"
            value="90D"
            id="ninetyDay"
            name="day"
            onChange={(e) => dayChange("90D")}
          />
          <label htmlFor="ninetyDay">90D</label>
        </div>
      </div>
      {/* Market Overview Cards - Global Market */}
      <div className={styles.marketOverview__main__sections}>
        <div class="row">
          <div className={"col-lg-4"}>
            <MarketOverviewCards
              data={setCurrentDayData ? currentDayData.slice(0, 1) : empty}
              constant={currentDayData.length > 1 ? 1 : 1}
              day={currentDayData.length > 1 ? dayValue : dayValue}
            />
          </div>
          <div className={"col-lg-4"}>
            <MarketOverviewCards
              data={setCurrentDayData ? currentDayData.slice(1, 2) : empty}
              constant={currentDayData.length > 1 ? 2 : 1}
              day={currentDayData.length > 1 ? dayValue : dayValue}
            />
          </div>
          <div className={"col-lg-4"}>
            <MarketOverviewCards
              data={setCurrentDayData ? currentDayData.slice(2, 3) : empty}
              constant={currentDayData.length > 1 ? 3 : 1}
              day={currentDayData.length > 1 ? dayValue : dayValue}
            />
          </div>
        </div>
      </div>
      {/* Market Overview Cards - Deep Dive */}
      <div>
        <h2 className={styles.marketOverview__heading}>Market Deep Dive</h2>
        <div className={styles.marketOverview__main__sections}>
          <div class="row">
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(3, 4) : empty}
                constant={currentDayData.length > 1 ? 4 : 1}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(4, 5) : empty}
                constant={currentDayData.length > 1 ? 5 : 1}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(5, 6) : empty}
                constant={currentDayData.length > 1 ? 6 : 1}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Market Overview Cards - Sectoral Performance */}
      <div>
        <h2 className={styles.marketOverview__heading}>Sectoral Performance</h2>

        <div className={styles.marketOverview__main__sections}>
          <div class="row">
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(6, 7) : empty}
                constant={currentDayData.length > 1 ? 7 : 1}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(7, 8) : empty}
                constant={currentDayData.length > 1 ? 10 : 1}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(9, 10) : empty}
                constant={currentDayData.length > 1 ? 13 : 1}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
          </div>
        </div>
        <div className={styles.marketOverview__main__sections}>
          <div class="row">
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(11, 12) : empty}
                constant={7}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(13, 14) : empty}
                constant={10}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                // For data = slice is 15 as placeholder only. currentDayData.slice(15, 16)
                data={setCurrentDayData ? currentDayData.slice(14, 15) : empty}
                constant={13}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
          </div>
        </div>
        {/* Additional Card for India Market */}
        <div className={styles.marketOverview__main__sections}>
          <div class="row">
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(15, 16) : empty}
                constant={16}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(16, 17) : empty}
                constant={19}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(17, 18) : empty}
                constant={21}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
          </div>
        </div>
        <div className={styles.marketOverview__main__sections}>
          <div class="row">
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(18, 19) : empty}
                constant={7}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(19, 20) : empty}
                constant={10}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
            <div className={"col-lg-4"}>
              <MarketOverviewCards
                data={setCurrentDayData ? currentDayData.slice(20, 21) : empty}
                constant={13}
                day={currentDayData.length > 1 ? dayValue : dayValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketOverview;
