import React, { useState } from "react";
import Activites_icons from "./activities_icons";
import "./banner.css";
import knight_logo from "./icons8-knight-96 3.png";
import cross from "./cross.png";

const Banner = (props) => {
  const [viewDetails, setViewDetails] = useState(false);
  const Scanner_dummy_details = [
    {
      ScannerID: 10012,
      Creator: "Invsto Team",
      Timeframe: "15min",
      Basket: "US Equity Market",
    },
  ];

  const viewDetailHandler = () => {
    setViewDetails(!viewDetails);
    if (viewDetails === true) props.strategy_detail(false);
    else props.strategy_detail(true);
    // console.log("in banner.js");
    // console.log(viewDetails);
  };

  return (
    <>
      <div className="container b_flex">
        <div
          className="b_col_one"
          // style={{ flex: props.sidebar ? "25%" : "20%" }}
        >
          <div className="knight_bg">
            <img src={knight_logo} width="80px" height="80px" alt=""></img>
          </div>
        </div>
        <div className="two_columns">
          <div className="b_col_two">
            <h3>{props.id ? `${props.name}` : ""}</h3>
            <p>
              This strategy captures momentum between SMA 50 and SMA 200
              indicators.
            </p>
            {props.id && !props.error ? (
              <p>Reloading in: {props.timeLeft} seconds</p>
            ) : props.error && props.id ? (
              <p style={{ color: "red" }}>
                Failed to fech signals for strategy "{props.name}". Try again
                later...
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="b_col_three">
            <Activites_icons />
          </div>
        </div>
      </div>
      <div
        className="strategy_details"
        style={{ display: viewDetails ? "block" : "none" }}
      >
        <img
          src={cross}
          width="18px"
          height="18px"
          onClick={viewDetailHandler}
          alt=""
        ></img>
        <p className="title">
          <span style={{ fontSize: "1rem" }}>
            <strong>Scanner Details</strong>
          </span>
        </p>

        {Scanner_dummy_details.map((scanner) => {
          return (
            <div className="details">
              <div className="keys">
                <span>ScannerID</span>
                <span>Creator</span>
                <span>Timeframe</span>
                <span>Basket</span>
              </div>
              <div>
                <span>{scanner.ScannerID}</span>
                <span>{scanner.Creator}</span>
                <span>{scanner.Timeframe}</span>
                <span>{scanner.Basket}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Banner;
