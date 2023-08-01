import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import styles from "./StrategyVault.module.css";
import searchIcon from "./imageAssets/searchIcon.svg";
import closeIcon from "./imageAssets/closeIcon.svg";
import StrategyVaultTable from "./StrategyVaultTable";
import Loader from "../../Loader/Loader";

import {
  fetchStrategies,
  reset,
} from "../services/strategySlice/strategySlice";

function StrategyVault() {
  const [strategyData, setStrategyData] = useState([]);
  const [searchEntry, setSearchEntry] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message, strategies } = useSelector(
    (state) => state.strategies
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success(message);
      setStrategyData(strategies);
    }

    dispatch(reset());
  }, [isLoading, isError, isSuccess]);

  useEffect(() => {
    dispatch(fetchStrategies(user.user_id));
  }, []);

  return (
    <div className={styles.strategyVault}>
      <ToastContainer />
      <div className={styles.strategyVault__header}>
        <div className={styles.strategyVault__header_heading}>
          <h3>Strategy Vault</h3>
          <p>Collection of your trading strategies</p>
        </div>

        <div className={styles.strategyVault__header_detail}>
          <p>
            <div></div>Updated 2 min ago
          </p>
          <div>
            <img src={searchIcon} alt="Search Field" />
            <input
              type="text"
              placeholder="Search"
              value={searchEntry}
              onChange={(e) => setSearchEntry(e.target.value)}
            />
            <img
              src={closeIcon}
              alt="Clear Search Field"
              onClick={() => setSearchEntry("")}
            />
          </div>
        </div>
      </div>

      <div className={styles.strategyVault__main}>
        {isLoading ? (
          <Loader />
        ) : (
          <StrategyVaultTable
            strategyData={
              searchEntry
                ? strategyData.filter((item) =>
                    item.strategy_name
                      .toLowerCase()
                      .includes(searchEntry.toLowerCase())
                  )
                : strategyData
            }
            setStrategyData={setStrategyData}
          />
        )}
      </div>
    </div>
  );
}

export default StrategyVault;
