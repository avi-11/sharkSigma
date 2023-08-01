import { TVChartContainer } from "./index";

import "../../App.css";
import styles from "./Chart.module.css";

function Chart() {
  return (
    <div style={{}}>
      <div className={styles.chart}>
        <TVChartContainer />
      </div>
      <div className={styles.chart}>
        <TVChartContainer />
      </div>
      <div className={styles.chart}>
        <TVChartContainer />
      </div>
      <div className={styles.chart}>
        <TVChartContainer />
      </div>
      <div className={styles.chart}>
        <TVChartContainer />
      </div>
      <div className={styles.chart}>
        <TVChartContainer />
      </div>
    </div>
  );
}

export default Chart;
