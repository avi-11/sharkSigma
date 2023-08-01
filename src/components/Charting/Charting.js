import "../../App.css";
import styles from "./Charting.module.css";

function Charting() {
  return (
    <div>
      <div className={styles.chart}>Chart1</div>
      <div className={styles.chart}>Chart2</div>
      <div className={styles.chart}>Chart3</div>
      <div className={styles.chart}>Chart4</div>
      <div className={styles.chart}>Chart5</div>
      <div className={styles.chart}>Chart6</div>
    </div>
  );
}

export default Charting;
