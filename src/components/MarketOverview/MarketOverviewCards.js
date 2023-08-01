import React, { useState } from "react";
import MarketIndexDetails from "./MarketIndexDetails";
import styles from "./MarketOverview.module.css";
import Pagination from "./Pagination";

function MarketOverviewCards({ data, temp, day, constant }) {
  const postPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

  const numberOfPages = 1;
  const paginationNeeded = numberOfPages > 1 ? true : false;

  const nextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(numberOfPages);
    }
  };

  return (
    <div className={styles.marketOverviewCards__container}>
      <div
        className={styles.marketOverviewCards}
        style={{ paddingBottom: `${paginationNeeded ? "3.5rem" : "0rem"}` }}
      >
        {/* **** SLICING FUNCTIONS **** */}
        {currentPost.map((item, index) => {
          let data90 = [];
          let data60 = [];
          let data30 = [];
          let data7 = [];

          let tickerSymbol = data[0].symbol;
          let close = data[0]["90D_US"].close;
          let dateTime = data[0]["90D_US"].date;

          if (close.length === 90)
            for (let i = 89; i >= 0; i--) {
              data90.push({
                uv: 0,
                pv: close[i].toFixed(2),
                amt: dateTime[i],
              });
            }

          if (close.length >= 60)
            for (let i = 59; i >= 0; i--) {
              data60.push({
                uv: 0,
                pv: close[i].toFixed(2),
                amt: dateTime[i],
              });
            }

          if (close.length >= 30)
            for (let i = 29; i >= 0; i--) {
              data30.push({
                uv: 0,
                pv: close[i].toFixed(2),
                amt: dateTime[i],
              });
            }

          if (close.length >= 7)
            for (let i = 6; i >= 0; i--) {
              data7.push({
                uv: 0,
                pv: close[i].toFixed(2),
                amt: dateTime[i],
              });
            }

          const timePeriod = () => {
            if (day === "90D") {
              return data90;
            } else if (day === "60D") {
              return data60;
            } else if (day === "30D") {
              return data30;
            } else if (day === "7D") {
              return data7;
            } else {
              return data7;
            }
          };

          // Last Price
          let lastPrice = data90.slice(-1)[0].pv;

          // % Change
          const percentChange = () => {
            console.log("data90", data90);
            console.log("data60", data60);
            console.log("data30", data30);
            console.log("data7", data7);

            let changeCalc2 = (data90.slice(-1)[0].pv / data90[1].pv - 1) * 100;
            let change2 = changeCalc2.toFixed(2);

            let changeCalc60 =
              (data60.slice(-1)[0].pv / data60[0].pv - 1) * 100;
            let change60 = changeCalc60.toFixed(2);

            let changeCalc30 =
              (data30.slice(-1)[0].pv / data30[0].pv - 1) * 100;
            let change30 = changeCalc30.toFixed(2);

            let changeCalc7 = (data7.slice(-1)[0].pv / data7[0].pv - 1) * 100;
            let change7 = changeCalc7.toFixed(2);

            if (day === "90D") {
              return change2;
            } else if (day === "60D") {
              return change60;
            } else if (day === "30D") {
              return change30;
            } else if (day === "7D") {
              return change7;
            } else {
              return change7;
            }
          };

          // $ Difference
          const dollarDifference = () => {
            let diffCalc2 = data90.slice(-1)[0].pv - data90[1].pv;
            let diff2 = diffCalc2.toFixed(2);

            let diffCalc60 = data60.slice(-1)[0].pv - data60[0].pv;
            let diff60 = diffCalc60.toFixed(2);

            let diffCalc30 = data30.slice(-1)[0].pv - data30[0].pv;
            let diff30 = diffCalc30.toFixed(2);

            let diffCalc7 = data7.slice(-1)[0].pv - data7[0].pv;
            let diff7 = diffCalc7.toFixed(2);

            if (day === "90D") {
              return diff2;
            } else if (day === "60D") {
              return diff60;
            } else if (day === "30D") {
              return diff30;
            } else if (day === "7D") {
              return diff7;
            } else {
              return diff7;
            }
          };

          const tickerNameSet = (name) => {
            if (name === "DIA  ") {
              return "DJIA Industry Index";
            } else if (name === "SPY  ") {
              return "US Large Cap (500)";
            } else if (name === "MDY  ") {
              return "US Mid Cap (400)";
            } else if (name === "SPSM  ") {
              return "US Small Cap (600)";
            } else if (name === "XLE  ") {
              return "Energy";
            } else if (name === "XLV  ") {
              return "Healthcare";
            } else if (name === "XLRE ") {
              return "Real Estate";
            } else if (name === "XLB  ") {
              return "Materials";
            } else if (name === "XLI  ") {
              return "Industrials";
            } else if (name === "XLC  ") {
              return "Communication Services";
            } else if (name === "XLP  ") {
              return "Consumer Staples";
            } else if (name === "XLK  ") {
              return "Technology";
            } else if (name == "XLU  ") {
              return "Utilities";
            } else if (name == "XLF  ") {
              return "Finance";
            }
            return name;
          };

          return (
            <MarketIndexDetails
              name={tickerNameSet(tickerSymbol)}
              tag={tickerSymbol}
              value={lastPrice}
              change={percentChange()}
              temp={timePeriod()}
              day={day}
              diff={dollarDifference()}
              constant={constant}
            />
          );
        })}
      </div>

      {numberOfPages > 1 ? (
        <div className={styles.marketOverviewCards__paginationContainer}>
          <Pagination
            nextPage={nextPage}
            previousPage={previousPage}
            numberOfPages={numberOfPages}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MarketOverviewCards;
