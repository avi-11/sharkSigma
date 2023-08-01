import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "./PredefinedBasket.css";
import PredefinedBasketTiles from "./PredefinedBasketTiles";
import Pagination from "../../MarketOverview/Pagination";
import Dropdown from "./AssetComponent/Dropdown/Dropdown";

import "../../../App.css";
import PredefinedBasketsSidebar from "./PredefinedBasketsSidebar";
import { getTickerList } from "../api/api";

function PredefinedBasket() {
  const [market, setMarket] = useState("India");
  const [active, setActive] = useState(true);
  const [instrument, setInstrument] = useState([]);
  const [instCount, setInstCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flagName, setFlagName] = useState();
  const [companyName, setCompanyName] = useState("nifty 50");
  const [data, setData] = useState([]);
  const [response, setResponse] = useState();
  const [ticker, setTicker] = useState([]);

  useEffect(() => {
    const fetchTicker = async () => {
      const resData = await getTickerList();
      setTicker(resData);
    };

    fetchTicker();
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/predefined/list"
      )
      .then((response) =>
        setData(
          response.data["basket-list"],
          setFlagName(flagName),
          setCompanyName(companyName)
        )
      );
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/predefined/instruments?basket_name=nifty_50_flag"
      )
      .then((response) => setTicker(response.data["basket-list"]));
    setActive("5px 0px 2px 3px red");
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/predefined/instruments?basket_name=nifty_50_flag"
      )
      .then((response) => setInstCount(response.data["basket-list"].length));
  }, []);

  var cookiePresent = document.cookie;

  // Fetches the predefined-basket details when user clicks on the tiles
  function callYourAPI(flag) {
    axios
      .get(
        `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/predefined/instruments?basket_name=${flag}`
      )
      .then((res) => {
        setResponse(res);
        setTicker(res.data["basket-list"]);
        setInstrument(res.data["basket-list"]);
        var lister = res.data["basket-list"];
        setInstCount(lister.length);
      });
  }

  const postPerPage = 9;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

  const numberOfPages = Math.ceil(data.length / postPerPage);

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

  const handleActive = (index) => {
    if (index > 0) {
      setActive(false);
    }
  };

  return (
    <div className="predefinedBaskets">
      <div className="predefinedBaskets__header">
        <h3>Industry standard baskets</h3>
        <p>
          Check out the list of predefined baskets or{" "}
          <Link to="/baskets" style={{ color: "#0B81EE" }}>
            create own basket
          </Link>
        </p>

        <div className="predefinedBaskets__header--sort">
          <label>Market: </label>
          <Dropdown
            currentValue={market}
            values={["India"]}
            setValue={setMarket}
          />
        </div>
      </div>

      <div className="predefinedBaskets__main">
        <div className="predefinedBaskets__baskets">
          {currentPost.map((basketName, index) => (
            <div
              className="tiletile"
              style={
                index === 0 && active
                  ? { boxShadow: "2px 0px 5px 3px rgb(255, 255, 255)" }
                  : { backgroundColor: "" }
              }
            >
              <PredefinedBasketTiles
                id={index + 1}
                title={basketName["1"]}
                icon={require(`./img/${basketName}.png`).default}
                handleClick={() => {
                  setCompanyName(basketName["1"]);
                  callYourAPI(basketName["0"]);
                  handleActive(index);
                }}
              />
            </div>
          ))}

          {numberOfPages > 1 ? (
            <div style={{ gridColumnStart: 1, gridColumnEnd: 4 }}>
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

        <PredefinedBasketsSidebar
          companyName={companyName}
          instCount={instCount}
          ticker={ticker}
        />
      </div>
      {!cookiePresent ? <Redirect to="/login" /> : null}
    </div>
  );
}

export default PredefinedBasket;
