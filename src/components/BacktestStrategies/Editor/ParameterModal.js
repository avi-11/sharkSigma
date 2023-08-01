import { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "@mui/material";

import styles from "./ParameterModal.module.css";
import ParameterModalInputFields from "./ParameterModalInputFields";

// Helper Functions
import { populateExistingStrategyDetails } from "../app/app";
import {
  fetchInstrumetsInMarket,
  getMarketInfo,
  postStrategySetting,
  putStrategySetting,
} from "../apis/api";
import { setCurrentStrategySettings } from "../services/slices/backtestSlice";
import { reactSelectStyle } from "../../../assets/Style_Templates/SelectStyles";

const ParameterModal = ({
  setParameterModalOpen,
  parameterModalRef,
  file,
  settingId,
}) => {
  const [data, setData] = useState({
    market: "",
    market_id: "",
    instrument: [],
    instrument_ids: [],
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    exchange: "",
    initial_capital: "",
    max_capital: "",
    time_period: "",
    long_only: false,
  });
  const [marketList, setMarketList] = useState([]);
  const [marketIds, setMarketIds] = useState([]);
  const [exchangeList, setExchangeList] = useState([]);
  const [instrumentList, setInstrumentList] = useState([]);
  const [errorDetails, setErrorDetails] = useState({
    errorMessage: "",
    errorField: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { currentStrategy } = useSelector((state) => state.backtest);

  async function fetchModalData() {
    setLoading(true);
    const res = await populateExistingStrategyDetails(
      data,
      setData,
      currentStrategy.settingId,
      marketList,
      marketIds,
      instrumentList,
      setInstrumentList
    );
    setData(res);
    dispatch(
      setCurrentStrategySettings({
        id: currentStrategy.id,
        settingId: currentStrategy.settingId,
        settings: res,
      })
    );

    setLoading(false);
  }

  useEffect(() => {
    getMarkets();
  }, []);

  const getMarkets = async () => {
    const { tempExchanges, tempMarketIds, tempMarkets } = await getMarketInfo();

    setMarketList(
      tempMarkets.map((item) => ({
        value: item,
        label: item,
      }))
    );
    setExchangeList(tempExchanges);
    setMarketIds(tempMarketIds);
  };

  useEffect(() => {
    if (currentStrategy.settingId && !data.market) fetchModalData();
  }, []);

  useEffect(() => {
    if (!data.instrument.length && currentStrategy.settingId) fetchModalData();
  }, [marketIds, data.instrument]);

  const customStyles = {
    option: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
      cursor: "pointer",
    }),
    control: () => ({
      display: "flex",
      border: "2px solid #1e2126",
      width: "100%",
    }),
    singleValue: (provided) => {
      const transition = "opacity 300ms";

      return { ...provided, transition };
    },
  };

  async function fetchInstrumentList(item) {
    const data = await fetchInstrumetsInMarket(item);
    setInstrumentList(data);
    console.log(data);
  }

  function addInstrument(instrument) {
    const instLen = instrument.length;

    if (instLen < 1) {
      setData({ ...data, instrument: [] });
      return;
    }

    const instrumentIDs = [];
    const existingInstruments = [];
    for (let i in instrument) {
      existingInstruments.push({
        label: instrument[i].value,
        value: instrument[i].value,
      });
      instrumentIDs.push(instrument[i].value);
    }

    setData({
      ...data,
      instrument: existingInstruments,
      instrument_ids: instrumentIDs,
    });

    let newInstrumentList = instrumentList;
    newInstrumentList = newInstrumentList.filter(
      (instrument) => !existingInstruments.includes(instrument[0])
    );
    setInstrumentList(newInstrumentList);
  }

  function changeDateFormat(date) {
    let dateArray = date.split("-");
    let newDate = `${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`;

    return newDate;
  }

  function checkForErrors() {
    // Check for empty fields
    for (let i in data) {
      if (!data[i] && i !== "long_only") {
        setErrorDetails({
          errorMessage: "Please fill all the fields",
          errorField: i,
        });
        toast("Please fill all the fields");
        return true;
      }
    }

    // Checks the instruments
    if (data.instrument.length < 1) {
      setErrorDetails({
        errorMessage: "Please select atleast one instrument",
        errorField: "instrument",
      });
      toast("Please fill all the fields");
      return true;
    }

    // Check Start Date and End Date
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);
    if (endDate < startDate) {
      setErrorDetails({
        errorMessage: "End Date should be greater than Start Date",
        errorField: "end_date",
      });
      toast("End Date should be greater than Start Date");
      return true;
    }

    // Check Capital Amount
    const initialCapital = parseInt(data.initial_capital);
    const maxCapital = parseInt(data.max_capital);
    if (initialCapital > maxCapital && initialCapital >= 0 && maxCapital >= 0) {
      setErrorDetails({
        errorMessage: "Max Capital should be greater than Initial Capital",
        errorField: "max_capital",
      });
      toast("Max Capital should be greater than Initial Capital");
      return true;
    }

    return false;
  }

  const postStrategySettings = async () => {
    if (checkForErrors()) return;

    let body = {
      market_id: "",
      instrument_ids: [],
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      time_period: "",
      long_only: false,
      initial_capital: 0,
      max_capital: 0,
    };
    for (let key in body) {
      body[key] = data[key];
    }

    body.start_date = changeDateFormat(body.start_date);
    body.end_date = changeDateFormat(body.end_date);

    const responseData = await postStrategySetting(body);
    if (responseData["error-message"]) {
      toast(responseData["error-message"][0]);
      return;
    } else {
      dispatch(
        setCurrentStrategySettings({
          id: currentStrategy.id,
          settings: body,
          settingId: responseData["strategy-settings-id"],
        })
      );
      toast("strategy settings added successfully");
      setErrorDetails({
        errorMessage: "",
        errorField: "",
      });
      setData({
        market: "",
        market_id: "",
        instrument: [],
        instrument_ids: [],
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        exchange: "",
        initial_capital: "",
        max_capital: "",
        time_period: "",
        long_only: false,
      });
    }
  };

  const checkVal = (val) => {
    if (val >= 0 || val == "") {
      return true;
    } else {
      toast("Value cannot be negetive");
    }
  };

  const updateStrategySettings = async () => {
    const body = { ...data, strategy_settings_id: settingId };
    body.start_date = changeDateFormat(body.start_date);
    body.end_date = changeDateFormat(body.end_date);

    try {
      const resData = await putStrategySetting(body);

      if (resData["error-message"]) {
        toast(resData["error-message"]);
        return;
      } else {
        dispatch(
          setCurrentStrategySettings({
            id: currentStrategy.id,
            settings: body,
            settingId: currentStrategy.settingId,
          })
        );
        toast("Updated");
      }
    } catch (err) {
      toast("An error occured...");
    }
  };

  return (
    <>
      <div className={styles.overlay}></div>
      <ToastContainer />
      <div className={styles.parameterModalContainer}>
        {!loading ? (
          <div className={styles.parameterModal} ref={parameterModalRef}>
            <div className={styles.parameterModalHeader}>
              <h3>Strategy Parameters</h3>
              <p>Set the parameters for your strategy</p>
            </div>

            <div className={styles.divider}></div>
            <div className={styles.parameterModalForm}>
              <div>
                <label
                  style={{
                    color: `${
                      errorDetails.errorField === "market" ? "red" : ""
                    }`,
                  }}
                >
                  Market
                </label>
                <Select
                  styles={reactSelectStyle}
                  value={
                    data.market
                      ? { value: data.market, label: data.market }
                      : ""
                  }
                  options={marketList}
                  onChange={(item) => {
                    setData({
                      ...data,
                      market: item.value,
                      market_id: marketIds[item.value],
                      exchange: "",
                    });
                    fetchInstrumentList(item.value);
                  }}
                />
                {console.log(marketList)}
              </div>

              <div>
                <label
                  style={{
                    color: `${
                      errorDetails.errorField === "instrument" ? "red" : ""
                    }`,
                  }}
                >
                  Instrument
                </label>
                <Select
                  styles={reactSelectStyle}
                  value={data.instrument}
                  isMulti
                  onChange={addInstrument}
                  options={
                    instrumentList.length > 0
                      ? instrumentList.map((item) => ({
                          value: item[0],
                          label: `${item[0]} - ${item[1]}`,
                        }))
                      : []
                  }
                />
              </div>

              <ParameterModalInputFields
                fieldName="Start Date"
                inputType={"date"}
                value={data.start_date}
                currencyType={""}
                setData={(e) => {
                  setData({
                    ...data,
                    start_date: e.target.value,
                  });
                }}
                error={
                  errorDetails.errorField === "start_date"
                    ? errorDetails.errorMessage
                    : ""
                }
              />

              <ParameterModalInputFields
                fieldName="Strategy End Date"
                inputType={"date"}
                value={data.end_date}
                currencyType={""}
                error={
                  errorDetails.errorField === "end_date"
                    ? errorDetails.errorMessage
                    : ""
                }
                setData={(e) => {
                  setData({
                    ...data,
                    end_date: e.target.value,
                  });
                }}
              />

              <ParameterModalInputFields
                fieldName="Strategy Start Hour"
                inputType={"time"}
                value={data.start_time}
                currencyType={""}
                setData={(e) =>
                  setData({ ...data, start_time: e.target.value })
                }
                error={
                  errorDetails.errorField === "start_time"
                    ? errorDetails.errorMessage
                    : ""
                }
              />

              <ParameterModalInputFields
                fieldName="Strategy End Hour"
                inputType={"time"}
                value={data.end_time}
                currencyType={""}
                error={
                  errorDetails.errorField === "end_time"
                    ? errorDetails.errorMessage
                    : ""
                }
                setData={(e) => setData({ ...data, end_time: e.target.value })}
              />

              <ParameterModalInputFields
                fieldName="Initial Capital"
                inputType={"number"}
                value={data.initial_capital}
                currencyType={"$"}
                error={
                  errorDetails.errorField === "initial_capital"
                    ? errorDetails.errorMessage
                    : ""
                }
                setData={(e) => {
                  if (checkVal(e.value)) {
                    setData({ ...data, initial_capital: e.value });
                  }
                }}
              />

              <ParameterModalInputFields
                fieldName="Max Capital"
                inputType={"number"}
                value={data.max_capital}
                currencyType={"$"}
                error={
                  errorDetails.errorField === "max_capital"
                    ? errorDetails.errorMessage
                    : ""
                }
                setData={(e) => {
                  if (checkVal(e.value)) {
                    setData({ ...data, max_capital: e.value });
                  }
                }}
              />

              <div>
                <label
                  style={{
                    color: `${
                      errorDetails.errorField === "exchange" ? "red" : ""
                    }`,
                  }}
                >
                  Exchange
                </label>
                <Select
                  styles={reactSelectStyle}
                  value={
                    data.exchange
                      ? { value: data.exchange, label: data.exchange }
                      : ""
                  }
                  options={
                    exchangeList[data.market] ? exchangeList[data.market] : []
                  }
                  onChange={(item) =>
                    setData({ ...data, exchange: item.value })
                  }
                />
              </div>

              <div>
                <label
                  style={{
                    color: `${errorDetails === "time_period" ? "red" : ""}`,
                  }}
                >
                  Frequency
                </label>
                <Select
                  styles={reactSelectStyle}
                  value={
                    data.time_period
                      ? {
                          value: data.time_period,
                          label: data.time_period,
                        }
                      : ""
                  }
                  options={[
                    { value: "1min", label: "1min" },
                    { value: "5min", label: "5min" },
                    { value: "15min", label: "15min" },
                    { value: "30min", label: "30min" },
                    { value: "1hour", label: "1hour" },
                    { value: "4hour", label: "4hour" },
                    { value: "1day", label: "1day" },
                    { value: "1week", label: "1week" },
                  ]}
                  onChange={(item) =>
                    setData({ ...data, time_period: item.value })
                  }
                />
              </div>

              <div>
                <label
                  style={{
                    color: `${errorDetails === "time_period" ? "red" : ""}`,
                  }}
                >
                  Long Only
                </label>

                <Checkbox
                  checked={data.long_only}
                  onChange={() =>
                    setData((data) => ({ ...data, long_only: !data.long_only }))
                  }
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  size="large"
                  sx={{
                    // Change checked color
                    "&.Mui-checked": {
                      color: "white",
                    },

                    // change border color
                    color: "black",
                  }}
                />
              </div>
            </div>

            <div className={styles.parameterModalButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setParameterModalOpen(false)}
              >
                Cancel
              </button>
              {!currentStrategy.settingId ? (
                <button
                  className={styles.saveButton}
                  onClick={(e) => postStrategySettings(e)}
                >
                  Save
                </button>
              ) : (
                <button
                  className={styles.saveButton}
                  onClick={(e) => updateStrategySettings(e)}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ParameterModal;
