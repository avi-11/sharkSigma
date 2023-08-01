import styles from "./StrategyCard.module.css";

function StrategyCard() {
  return (
    <div
      className={styles.strategyCard}
      style={{
        background: `#292c3d`,
      }}
    >
      <p className={styles.strategyStatus}>Active</p>

      <div>
        <p className={styles.strategySID}>SID: 768902</p>
        <div className={styles.strategyDetail}>
          <div className={styles.strategyName}>
            <h4>
              Odd Even <br />
              Strategy
            </h4>
            <p>deployed 45 days ago</p>
          </div>

          <div className={styles.strategyNumbers}>
            <div>
              <h4>Rs. 20.5L</h4>
              <p>capital deployed</p>
            </div>

            <div>
              <h4>+ 9.1%</h4>
              <p>ROI this month</p>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>View Details {">"} </p>
      </footer>
    </div>
  );
}

export default StrategyCard;
