import { useSelector } from "react-redux";

import styles from "./Dashboard.module.css";
import cardBackground from "../../assets/Images/cardBackground.png";
import StrategyCard from "./StrategyCard";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  // Convert username to title case
  const username = user.username
    ?.split(" ")
    ?.map((word) => word[0].toUpperCase() + word.slice(1))
    ?.join(" ");

  return (
    <>
      <div className={styles.welcomeText}>
        <h2>Hi {username}!</h2>
        <p>What do you want to do today?</p>
      </div>

      <div className={styles.performanceIndex}>
        <div>
          <h3>Your Performance</h3>

          <div className={styles.performanceValues}>
            <div className={styles.performanceValues__profits}>
              <p className={styles.profitValue}>90.54K</p>
              <p className={styles.capitalValue}>
                Profit & Loss <span style={{ color: "#94C843" }}>9.1%</span>
              </p>
            </div>

            <div className={styles.performanceValues__capital}>
              <p className={styles.capitalValue}>
                Current Value <span>Rs. 8.76L</span>
              </p>

              <p className={styles.capitalValue}>
                Investment <span>Rs. 8.06L</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.performanceBoard}></div>

          <p className={styles.link}>Performance Details</p>
        </div>
      </div>

      <div className={styles.strategiesList}>
        <h3>Your Strategies</h3>

        <div className={styles.strategyCards}>
          <StrategyCard />

          <StrategyCard />

          <StrategyCard />

          <StrategyCard />
        </div>

        <p className={styles.link}>View all Strategies</p>
      </div>

      <div className={styles.openPositions}>
        <h3>Open Positions</h3>
      </div>
    </>
  );
};

export default Dashboard;
