import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./BacktestLayout.css";
import "../../../App.css";

import BacktestEditor from "../Editor/BacktestEditor";
import Loader from "../../Loader/Loader";

// Helper Function
import { getBacktestData, reset } from "../services/slices/backtestSlice";
import { toast } from "react-toastify";

function BacktestLayout() {
  const [strategyData, setStrategyData] = useState([]);
  const strategyId = useLocation().search.split("?")[1];

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message, backtestData } = useSelector(
    (state) => state.backtest
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success("Fetched Data for Strategy Id: " + strategyId);
      setStrategyData(backtestData);
    }

    dispatch(reset());
  }, [isLoading, isError, isSuccess]);

  useEffect(() => {
    if (strategyId) {
      dispatch(getBacktestData(strategyId));
    } else {
      setStrategyData(backtestData);
    }
  }, [strategyId]);

  return (
    <>
      <div>
        <div className="backtest_head">
          <h3>Create Strategies</h3>
          <p>
            Create your strategies with a simple strategy builder or upload your
            strategy file.{" "}
          </p>
        </div>
        {strategyData.length < 1 ? (
          <Loader />
        ) : (
          <BacktestEditor
            strategyUpdate={strategyId ? true : false}
            strategyData={strategyData}
          />
        )}
      </div>
    </>
  );
}
export default BacktestLayout;
