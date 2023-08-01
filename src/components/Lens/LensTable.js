import { useEffect } from "react";
import { useState } from "react";
import styles from "./Lens.module.css";
import down from "./assets/down.svg";
import search from "./assets/search.svg";

const LensTable = ({ data }) => {
  const [drop, setDrop] = useState(false);
  const [sort, setSort] = useState("high2low");
  const [dat, setDat] = useState(data);
  const [d, setD] = useState(data);
  const SORT = {
    high2low: (a, b) => b[1]["Score"] - a[1]["Score"],
    low2high: (a, b) => a[1]["Score"] - b[1]["Score"],
    a2z: function (a, b) {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    },
  };

  const sortLogic = (sortFn) => {
    setDat(dat.sort(sortFn));
    setDrop(!drop);
  };

  const filterLogic = (a) => {
    setDat(d.filter((items) => items[0].indexOf(a.toUpperCase()) > -1));
  };

  // useEffect(() => {
  //   if (sort == "high2low") {

  //   }
  //   if (sort == "low2high") {
  //     let dataL =
  //     setDat(dataL);
  //   }
  //   if (sort == "a2z") {
  //     let dataL = dat.sort(function (a, b) {
  //       if (a[0] < b[0]) {
  //         return -1;
  //       }
  //       if (a[0] > b[0]) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     setDat(dataL);
  //   }

  //   console.log(dat);
  // }, [sort]);
  return (
    <div className={styles.lens_upperHead_less}>
      <table>
        <thead>
          <tr>
            <th
              style={{ width: "223px" }}
              onMouseLeave={() => setDrop(false)}
              onMouseEnter={() => setDrop(true)}
              className={styles.lens_head}
            >
              Instrument/score{" "}
              <span style={{ marginLeft: "1rem" }}>
                <img src={down} />
              </span>
              <div
                className={
                  drop ? styles.lens_dropDown : styles.lens_dropDown_hide
                }
              >
                <div className={styles.lens_searchBar}>
                  <input
                    type="text"
                    className={styles.lens_search}
                    onChange={(e) => {
                      filterLogic(e.target.value);
                      setD(data);
                    }}
                  />
                  <img src={search} className={styles.lens_searchIcon} />
                </div>
                <p
                  className={styles.lens_para}
                  onClick={() => sortLogic(SORT["high2low"])}
                >
                  High to low
                </p>
                <p
                  className={styles.lens_para}
                  onClick={() => sortLogic(SORT["low2high"])}
                >
                  low to high
                </p>
                <p
                  className={styles.lens_para}
                  onClick={() => sortLogic(SORT["a2z"])}
                >
                  A to Z
                </p>
              </div>
            </th>

            <th style={{ minWidth: "119px" }} className={styles.lens_head}>
              Trends
            </th>
            <th className={styles.lens_head}>ADX {">"} 25</th>
            <th className={styles.lens_head}>High {">"} Previous High</th>
            <th className={styles.lens_head}>Low {"<"} Previous Low</th>
            <th className={styles.lens_head}>MA 50 {">"} MA 200</th>
            <th className={styles.lens_head}>Price {">"} MA 20</th>
            <th className={styles.lens_head}>Price {">"} CPP</th>
            <th className={styles.lens_head}>Price {">"} R1</th>
            <th className={styles.lens_head}>Price {">"} PrevCPP</th>
            <th className={styles.lens_head}>Price {"<"} S1</th>
            <th className={styles.lens_head}>Price {">"} VWAP</th>
            <th className={styles.lens_head}>Rsi(14) {">"} 50</th>

            <th className={styles.lens_head}>Price {">"} upperband</th>
            <th className={styles.lens_head}>Price {"<"} lowerband</th>
          </tr>
        </thead>

        <tbody>
          {dat?.length > 0
            ? dat.map((item) => {
                return (
                  <tr
                    className={
                      item.id % 2 === 0
                        ? styles.lens_evencol
                        : styles.lens_oddcol
                    }
                  >
                    <td className={styles.lens_companyName}>
                      <div>
                        <div>
                          <p>{item[0]}</p>
                          <p>{item[0]}</p>
                        </div>
                        <p>{item[1]?.Score}</p>
                      </div>
                    </td>

                    <td
                      className={
                        item[1]?.Score >= 1
                          ? styles.lens_table_heading2_green
                          : item[1]?.Score < 0
                          ? styles.lens_table_heading2_red
                          : styles.lens_table_heading2_neutral
                      }
                    >
                      <p>
                        {item[1]?.Score >= 1
                          ? "Bullish"
                          : item[1]?.Score < 0
                          ? "Bearish"
                          : "Neutral"}
                      </p>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["adx_gt_25"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["adx_gt_25"]["Metric Score"] == -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>25.00</p>
                        </div>

                        <div>
                          <p>ADX</p>
                          <p>{item[1]?.["adx_gt_25"]["ADX"]?.toFixed(2)}</p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["high_gt_prevHigh"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["high_gt_prevHigh"]["Metric Score"] ==
                                -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>
                            {item[1]?.["high_gt_prevHigh"]["High"]?.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p>Previous High</p>
                          <p>
                            {item[1]?.["high_gt_prevHigh"][
                              "Previous High"
                            ]?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["low_lt_preLow"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["low_lt_preLow"]["Metric Score"] == -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>{item[1]?.["low_lt_preLow"]["Low"]?.toFixed(2)}</p>
                        </div>

                        <div>
                          <p>Previous Low</p>
                          <p>
                            {item[1]?.["low_lt_preLow"][
                              "Previous Low"
                            ]?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["ma50_gt_ma200"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["ma50_gt_ma200"]["Metric Score"] == -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>MA 50</p>
                          <p>
                            {item[1]?.["ma50_gt_ma200"]["MA 50"]?.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p>MA 200</p>
                          <p>
                            {item[1]?.["ma50_gt_ma200"]["MA 200"]?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["price_gt_20ma"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["price_gt_20ma"]["Metric Score"] == -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>
                            {item[1]?.["price_gt_20ma"]["Price"]?.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p>MA 20</p>
                          <p>
                            {item[1]?.["price_gt_20ma"]["MA 20"]?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["price_gt_CPP"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["price_gt_CPP"]["Metric Score"] == -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>
                            {item[1]?.["price_gt_CPP"]["Price"]?.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p>CPP</p>
                          <p>{item[1]?.["price_gt_CPP"]["CPP"]?.toFixed(2)}</p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["price_gt_R1"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["price_gt_R1"]["Metric Score"] == -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>{item[1]?.["price_gt_R1"]["Price"]?.toFixed(2)}</p>
                        </div>

                        <div>
                          <p>R1</p>
                          <p>{item[1]?.["price_gt_R1"]["R1 PP"]?.toFixed(2)}</p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["price_gt_prevCPP"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["price_gt_prevCPP"]["Metric Score"] ==
                                -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>
                            {item[1]?.["price_gt_prevCPP"]["Price"]?.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p>Previous CPP</p>
                          <p>
                            {item[1]?.["price_gt_prevCPP"][
                              "Previous CPP"
                            ]?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["price_lt_S1"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["price_lt_S1"]["Metric Score"] == -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>{item[1]?.["price_lt_S1"]["Price"]?.toFixed(2)}</p>
                        </div>

                        <div>
                          <p>S1</p>
                          <p>{item[1]?.["price_lt_S1"]["S1 PP"]?.toFixed(2)}</p>
                        </div>
                      </div>
                    </td>

                    {/* <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["Price within 10% 52wekk Low"] == 1
                              ? styles.lens_priceColored
                              : styles.lens_priceRedColored
                          }
                        >
                          <p>Price</p>
                          <p>225.05</p>
                        </div>

                        <div>
                          <p>Price High</p>
                          <p>205.5</p>
                        </div>
                      </div>
                    </td> */}

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["price_gt_VWAP"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["price_gt_VWAP"]["Metric Score"] == -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>
                            {item[1]?.["price_gt_VWAP"]["Price"]?.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p>VWAP</p>
                          <p>
                            {item[1]?.["price_gt_VWAP"]["VWAP"]?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["rsi_gt_50"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["rsi_gt_50"]["Metric Score"] == -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>50.00</p>
                        </div>

                        <div>
                          <p>RSI</p>
                          <p>{item[1]?.["rsi_gt_50"]["RSI"]?.toFixed(2)}</p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["price_gt_BBUpper"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["price_gt_BBUpper"]["Metric Score"] ==
                                -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>
                            {item[1]?.["price_gt_BBUpper"]["Price"]?.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p>UpperBand</p>
                          <p>
                            {item[1]?.["price_gt_BBUpper"][
                              "Upper BBand"
                            ]?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.lens_prices}>
                      <div>
                        <div
                          className={
                            item[1]?.["price_lt_BBLower"]["Metric Score"] == 1
                              ? styles.lens_priceColored
                              : item[1]?.["price_lt_BBLower"]["Metric Score"] ==
                                -1
                              ? styles.lens_priceRedColored
                              : styles.lens_priceColored_normal
                          }
                        >
                          <p>Price</p>
                          <p>
                            {item[1]?.["price_lt_BBLower"]["Price"]?.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p>LowerBand</p>
                          <p>
                            {item[1]?.["price_lt_BBLower"][
                              "Lower BBand"
                            ]?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default LensTable;
