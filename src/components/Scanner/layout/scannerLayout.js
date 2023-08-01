import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Banner from "../Banner/banner";
import Table_content from "../table/table";
import "./scannerLayout.css";
import { fetchSignals } from "../apis/SignalAPI";

import "../../../App.css";

function ScannerLayout() {
  const [detailIsShown, setDetailIsShown] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { strategyId, strategyName } = location.state
    ? location.state
    : { strategyId: undefined, strategyName: undefined };

  useEffect(() => {
    if (strategyId) {
      getSignals(strategyId);
    }
  }, [strategyId]);

  useEffect(() => {
    timeLeft > 0 &&
      strategyId &&
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000);

    if (timeLeft === 0 && strategyId && !loading && !error) {
      getSignals(strategyId);
      setTimeLeft(60);
    }
  }, [timeLeft, loading, strategyId, error]);

  const getSignals = async (strategyId) => {
    setLoading(true);
    const res = await fetchSignals(strategyId);

    if (res.status !== 200) {
      setError(res);
      toast.error("Something went wrong. Please try again later.");
    } else {
      const dat = JSON.parse(res.data);
      const data = dat.all_signals;
      if (typeof data === "string") {
        toast.error(data);
        setLoading(false);
        setError(data);
        setData([]);
        return;
      }

      setData(data?.reverse());
    }

    setLoading(false);
  };

  const detailViewHandler = (IsDetailsShown) => {
    setDetailIsShown(IsDetailsShown);
  };

  return (
    <div>
      <ToastContainer />
      <div className="col_one">
        <div className="row21">
          <Banner
            id={strategyId}
            name={strategyName}
            strategy_detail={detailViewHandler}
            timeLeft={timeLeft}
            error={error}
          />
        </div>
        <div className="row22">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <Table_content strategy_detail_view={detailIsShown} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}
export default ScannerLayout;
