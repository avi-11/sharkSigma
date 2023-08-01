import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getData } from "./LensSlice";

import styles from "./Lens.module.css";

import Dropdown from "../Baskets/PredefinedBaskets/AssetComponent/Dropdown/Dropdown";
import LensStarter from "./LensStarter";
import LensTable from "./LensTable";
import axios from "axios";
import { postLensData } from "./api/api";

const Lens = () => {
  const [data, setData] = useState([useSelector((state) => state.lens.data)]);
  const [currDate, setCurrDate] = useState("");
  const [time, setTime] = useState("");
  const [M, setM] = useState("");
  const [refresh, setRefresh] = useState(null);
  const [sort, setSort] = useState("high2low");

  const [d, setD] = useState([]);

  const [show, setShow] = useState(false);

  const [marketName, setmarketName] = useState(["INDIA"]);

  const [Instrument, setInstrument] = useState(["NIFTY50"]);

  const [frequency, setFrequency] = useState(["1D"]);

  const getDataLens = async () => {
    const res = await axios.get(
      "https://psgiupykxa.us-east-2.awsapprunner.com/lens_api",
      {
        headers: {
          country: "INDIA",
          basket: "NIFTY50",
          timeframe: "1D",
        },
      }
    );

    let resData = JSON.parse(res.data);
    console.log(resData);
    // for (let i in resData) {
    //   setD(d.push({ name: i, data: resData[i] }));
    // }

    // d.map((item) => console.log(item.name));
    setD(Object.entries(resData));

    // setRefresh(10000);

    var currentdate = new Date();
    let month = `${currentdate.getMonth() + 1}`;
    let day = `${currentdate.getDate()}`;
    let hours = `${currentdate.getHours()}`;
    let min = `${currentdate.getMinutes()}`;

    if (currentdate.getMonth() + 1 < 10) {
      month = `0${currentdate.getMonth() + 1}`;
    }

    if (currentdate.getDate() < 10) {
      day = `0${currentdate.getDate()}`;
    }

    if (currentdate.getHours() < 10) {
      hours = `0${currentdate.getHours()}`;
    }

    if (currentdate.getMinutes() < 10) {
      min = `0${currentdate.getMinutes()}`;
    }

    if (currentdate.getHours() > 11) {
      setM("PM");
    } else {
      setM("AM");
    }

    setCurrDate(`${day}-${month}-${currentdate.getFullYear()}`);
    setTime(`${hours}:${min}`);

    setShow(true);
  };

  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     if (refresh > 0) {
  //       setRefresh(refresh - 1);
  //     } else {
  //       clearInterval(timer);
  //       getDataLens();
  //     }
  //   }, 1000);
  // });
  //
  return (
    <div className={styles.lens}>
      {show ? (
        <div className={styles.lens_first_open}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1>Lens</h1>
            <p className={styles.lens_activeStatus}>Active</p>
          </div>

          <div className={styles.lens_mainHead}>
            <div className={styles.lens_first_dropdown}>
              <Dropdown
                className={styles.main_dropdown}
                currentValue={marketName[0]}
                setCurrentMarketValue={(e) => {}}
                values={marketName}
                setValue={(e) => {}}
              />
              <Dropdown
                className={styles.main_dropdown}
                currentValue={Instrument[0]}
                setCurrentMarketValue={(e) => {}}
                values={Instrument}
                setValue={(e) => {}}
              />
              <Dropdown
                className={styles.main_dropdown}
                currentValue={frequency[0]}
                setCurrentMarketValue={(e) => {}}
                values={frequency}
                setValue={(e) => {}}
              />
              <button
                className={styles.lens_first_start}
                onClick={(e) => getDataLens()}
              >
                Get Signals
              </button>
            </div>
            <div>
              <p className={styles.lens_nextUpdate}>
                Next update in : 07:23:08
              </p>
              <p style={{ color: "#8D8C8C" }}>
                Last updated : {currDate}, {time} {M} IST
              </p>
            </div>
          </div>
          <LensTable data={d} />
        </div>
      ) : (
        <LensStarter
          marketName={marketName}
          Instrument={Instrument}
          frequency={frequency}
          getDataLens={getDataLens}
        />
      )}
    </div>
  );
};

export default Lens;
