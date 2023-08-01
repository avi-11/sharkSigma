import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import XLSX from "xlsx";
import { useSelector, useDispatch } from "react-redux";

import "../../../App.css";
import "./BasketLayout.css";

import MOCK_DATA_BASKET from "./MOCK_DATA(2).json";
import { fetchInstrumetsInMarket } from "../../BacktestStrategies/apis/api";

import { COLUMNS } from "../Table/columns.js";
import CreateScannerPaginationTable from "../../CreateScanner/Table/CreateScannerTable";
import BasketInstrumentSearch from "./BasketInstrumentSearch";

// Importing Assets
import rightArrowIcon from "../assets/rightArrow.svg";

// Importing Components used
import CreateBasket from "./CreateBasket";
import BasketLabel from "./BasketLabels";
import ExportBasketData from "../PredefinedBaskets/AssetComponent/ExportBasketData/ExportBasketData";
import {
  fetchBasket,
  postBasket,
  updateBasket,
  deleteBasket,
  updateInsBasket,
  updateInsDelBasket,
  changeCurrentBasket,
} from "../services/slices/basketSlice";

// market-type = india, us largecap, us smallcap, us midcap

function BasketLayout() {
  const columns = useMemo(() => COLUMNS, []);
  const markets = ["US LargeCap", "US MidCap", "US SmallCap", "India"];

  let createBasket = false;
  const [searchVal, setSearchVal] = useState("");
  const [check, setCheck] = useState(false);

  const [instCount, setInstCount] = useState();

  const [basketSelected, setBasketSelected] = useState([]); // Storing the contents of existing selected basket
  const [selectedMarket, setSelectedMarket] = useState([]); //Contains instrument details for the selected market
  const [basketName, setBasketName] = useState(null); // Changes when the "Basket Name" field is changed in the "Create Basket" pop-up form. Store the input basket name by user.
  const [market, setMarket] = useState(""); // Stores the current market value selected by the user in the "Create Basket" field.
  const [multiSelected, setMultiSelected] = useState([]); // Stores the current value of instruments selected by the user in the "Create Basket" form
  const [baskett, setBaskett] = useState(); // Stores the user defined baskets fetched from the backend

  const [currentBasket, setCurrentBasket] = useState(""); // Stores which "basket label" is currently selected
  const [deleteBasketClicked, setDeleteBasketClicked] = useState(false); // Gets initialized to true once we click the delete button for a particuar "Basket Label"
  const [currentBasketData, setCurrentBasketData] = useState([]); //Stores the data or information in a particular user defined basket
  const [basket, setBasket] = useState(MOCK_DATA_BASKET);

  const [activeBasketSearchData, setActiveBasketSearchData] = useState([]); // This data will eb further used to filter out or store the instruments used in the search field for current selected basket.
  const [indiaMarketInstruments, setIndiaMarketInstruments] = useState([]); // Stores the instruments for indian Market
  const [uslargecapMarketInstruments, setUSLargecapMarketInstruments] =
    useState([]); // Stores the instruments for US largecap Market
  const [usmidcapMarketInstruments, setUSMidcapMarketInstruments] = useState(
    []
  ); // Stores instruments for US midcap market
  const [ussmallcapMarketInstruments, setUSSmallcapMarketInstruments] =
    useState([]); // Stores instruments for US smallcap market

  const [basketSearchValue, setBasketSearchValue] = useState([]); // Stores the value entered in the search field for the current selected basket
  const [showInstrumentContainer, setShowInstrumentContainer] = useState(false); // Toggles the search box data
  const [csvData, setCsvData] = useState([]);

  const searchContainerRef = useRef(null);

  const dispatch = useDispatch();
  const { basketList, loading, error, message, success, currBasket, action } =
    useSelector((state) => state.basket);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) toast.error(message);
    if (success) {
      setBaskett(basketList);
      if (action === "delete") {
        setInstCount(null);
        setCurrentBasket("");
        setBasketSelected([]);
      }
      if (message === "basket created successfully") {
        fetchBasketList();
        toast.success(message);
      } else if (message) {
        toast.success(message);
      }
    }
    console.log(baskett);
  }, [error, success, loading, basketList]);

  // Fetches the baskets user has created from the API.
  useEffect(() => {
    fetchBasketList();
  }, []);

  useEffect(() => {
    console.log(currBasket);
  }, [currBasket]);

  useEffect(() => {
    console.log(currentBasketData);
  }, [currentBasketData]);

  const fetchBasketList = async () => {
    dispatch(fetchBasket(user.user_id));
  };

  // Fetches the instruments for each market
  useEffect(() => {
    const getIndianMarketInstruments = async (market) => {
      const data = await fetchInstrumetsInMarket(market);
      setIndiaMarketInstruments(data);
    };

    getIndianMarketInstruments("India");
  }, []);

  useEffect(() => {
    const getUSLargeCapMarketInstruments = async (market) => {
      const data = await fetchInstrumetsInMarket(market);
      setUSLargecapMarketInstruments(data);
    };

    getUSLargeCapMarketInstruments("US LargeCap");
  }, []);

  useEffect(() => {
    const getUSMidCapMarketInstruments = async (market) => {
      const data = await fetchInstrumetsInMarket(market);
      setUSMidcapMarketInstruments(data);
    };

    getUSMidCapMarketInstruments("US MidCap");
  }, []);

  useEffect(() => {
    const getUSSmallCapMarketInstruments = async (market) => {
      const data = await fetchInstrumetsInMarket(market);
      setUSSmallcapMarketInstruments(data);
    };

    getUSSmallCapMarketInstruments("US SmallCap");
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        if (showInstrumentContainer) {
          setShowInstrumentContainer(false);
        }
      }

      // if(fileMenuRef.current && !fileMenuRef.current.contains(event.target)) {
      //   if(fileMenuOpen !== "") {
      //     setFileMenuOpen("")
      //   }
      // }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef, showInstrumentContainer]);

  // Function below gets executed when the "Create Basket" pop-up form is submitted
  const createBasketHandler = async (e) => {
    dispatch(
      postBasket({
        user: user.user_id,
        data: {
          basket_name: basketName,
          market_name: market,
          instruments: `"${multiSelected}"`,
        },
      })
    );
  };

  // Handles the change in the "Select Market" field in "Create Basket" form
  const handleChange = (event) => {
    const value = event;
    setMarket(value);
    setMultiSelected([]);

    if (value === "US MidCap") {
      setSelectedMarket(usmidcapMarketInstruments);
    } else if (value === "US LargeCap") {
      setSelectedMarket(uslargecapMarketInstruments);
    } else if (value === "US SmallCap") {
      setSelectedMarket(ussmallcapMarketInstruments);
    } else if (value === "India") {
      setSelectedMarket(indiaMarketInstruments);
    }
  };

  // Handles the change in value in the "Select Instrument" Multi-select input field in "Create Basket" form.
  const handleMultiChange = (e) => {
    setMultiSelected(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  // Gets called when the "basket label" gets clicked
  // Sets the data so as to render it in the table below
  const passData = (existingbasket) => {
    console.log(existingbasket);
    const marketName = existingbasket.market;
    let instrumentNames;

    if (marketName === "India") instrumentNames = indiaMarketInstruments;
    else if (marketName === "US SmallCap")
      instrumentNames = ussmallcapMarketInstruments;
    else if (marketName === "US MidCap")
      instrumentNames = usmidcapMarketInstruments;
    else if (marketName === "US LargeCap")
      instrumentNames = uslargecapMarketInstruments;

    let temp = existingbasket.instruments.map((item) => ({
      Ticker: item,
      "Instrument Name": instrumentNames
        .map((ticker) => {
          if (ticker[0] === item) return ticker[1];
          return "";
        })
        .filter((item) => item !== "")[0],
    }));

    dispatch(
      changeCurrentBasket({
        name: existingbasket.name,
        market: existingbasket.market,
        instruments: temp,
        id: existingbasket.id,
        is_favorite: existingbasket.is_favorite,
      })
    );

    getInstrumentsForCurrentBasket(existingbasket.market);
    setBasketSelected(temp);
    setInstCount(existingbasket.instruments.length);
    setCurrentBasketData(existingbasket);
    setBasketSearchValue("");
    setShowInstrumentContainer(false);
    getCSVData(instrumentNames, existingbasket.instruments);
  };

  // Can be moved to modules.js...
  // !!! Important
  const getCSVData = (instrumentNames, basketInstruments) => {
    const instruments = basketInstruments?.instruments
      ? basketInstruments?.instruments
      : [];

    let csvData = instruments.map((item) => {
      for (let i in instrumentNames) {
        if (instrumentNames[i][0] === item)
          return [instrumentNames[i][0], instrumentNames[i][1]];
      }
    });

    setCsvData(csvData);
  };

  // Fetches the instruments for the current user defined basket active, this data will then be used within the search field...
  const getInstrumentsForCurrentBasket = async (market) => {
    const data = await fetchInstrumetsInMarket(market);
    console.log(data);
    setActiveBasketSearchData(data);
  };

  // Gets implemented when the delete button for a particular basket ic clicked in the "Basket label"
  async function deletebasket(basket) {
    dispatch(
      deleteBasket({
        id: basket.id,
        name: basket.name,
      })
    );
  }

  // !! Important
  // Called when the delete icon for the "Basket Label" is clicked
  const handleCheck = () => {
    setCheck((prevState) => ({
      check: !prevState.check,
    }));
  };

  // Gets called when the value in search input field in "Basket Instrument Search" is changed.
  const searchHandler = (e) => {
    if (basket.length === 0) {
      document.getElementById("add_intrument").value = "";
      alert("First create a basket !!");
      return;
    }

    if (currentBasket === "Empty Basket" || currentBasket === undefined) {
      alert("First select a Basket !!");
      return;
    }

    setSearchVal(e.target.value);
  };

  const makeCSVData = (tempMarketInstruments) => {
    let tempCSVData = [];

    for (let item in currentBasketData.instruments) {
      for (let i in tempMarketInstruments) {
        if (tempMarketInstruments[i][0] === currentBasketData.instruments[item])
          tempCSVData.push(tempMarketInstruments[i]);
      }
    }

    return tempCSVData;
  };

  // Exporting the basket data in XLSX format
  const downloadXlsx = () => {
    const Heading = [["Ticker", "Instrument Name"]];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, Heading);

    let tempMarketInstruments;
    if (currentBasketData.market === "India")
      tempMarketInstruments = indiaMarketInstruments;
    else if (currentBasketData.market === "US SmallCap")
      tempMarketInstruments = ussmallcapMarketInstruments;
    else if (currentBasketData.market === "US LargeCap")
      tempMarketInstruments = uslargecapMarketInstruments;
    else if (currentBasketData.market === "US MidCap")
      tempMarketInstruments = usmidcapMarketInstruments;

    let excelData = makeCSVData(tempMarketInstruments);

    //Starting in the second row to avoid overriding and skipping headers
    XLSX.utils.sheet_add_json(ws, excelData, {
      origin: "A2",
      skipHeader: true,
    });
    console.log(excelData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // console.log(currentBasketData)

    XLSX.writeFile(wb, `${currentBasket.toUpperCase()}.xlsx`);
  };

  const addInstrumentToBasket = async (instrument) => {
    dispatch(
      updateInsBasket({
        user: user.user_id,
        data: {
          id: currentBasketData.id,
          basket_name: currentBasketData.name,
          market_name: currentBasketData.market,
          instruments: currentBasketData.instruments,
          is_favorite: currentBasketData.is_favorite,
        },
        instrument: instrument,
      })
    );
  };

  const deleteInstrumentFromBasket = async (instrument) => {
    dispatch(
      updateInsDelBasket({
        user: user.user_id,
        data: {
          id: currBasket.id,
          basket_name: currBasket.name,
          market_name: currBasket.market,
          instruments: currBasket.instruments,
        },
        instrument: instrument,
      })
    );
  };

  // Renders the edit and delete column in the basket table
  const editNdelete = (row) => {
    return (
      <>
        <div
          className="edit_delete_button"
          style={{ float: "right", marginRight: "1rem" }}
        >
          <button
            className="delete"
            style={{ padding: "0.4rem 0rem", top: "7px", margin: "auto" }}
            onClick={() => {
              deleteInstrumentFromBasket(row.values.Ticker);
            }}
          >
            DELETE
          </button>
        </div>
      </>
    );
  };

  //Adds or removes a basket from favourites list
  const addToFavourites = async (existingbasket) => {
    dispatch(
      updateBasket({
        user: user.user_id,
        data: {
          basket_name: `${existingbasket.name}`,
          market_name: `${existingbasket.market}`,
          instruments: `"${existingbasket.instruments}"`,
          is_favorite: !existingbasket.is_favorite,
        },
      })
    );
  };

  return (
    <div>
      <div className="basket_head">
        <h3>
          <strong>Baskets</strong>
        </h3>

        <p>
          Choose upto 500 intruments from multiple exchanges or choose from one
          of our{" "}
          <Link to="/baskets/predefinedBaskets">
            <span>predefined baskets</span>{" "}
            <img src={rightArrowIcon} className="basket__rightArrow" alt="" />
          </Link>
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#0B81EE", fontWeight: "600" }}>
            FAVOURITE BASKETS
          </p>
        </div>
        <div className="all_baskets">
          <div className="fav_baskets mb-3">
            <CreateBasket
              // Method Props
              setBasketName={setBasketName}
              handleChange={handleChange}
              handleMultiChange={handleMultiChange}
              createBasketHandler={createBasketHandler}
              setMultiSelected={setMultiSelected}
              setMarket={setMarket}
              // Data props
              markets={markets}
              selectedMarket={selectedMarket}
              basketName={basketName}
              multiSelected={multiSelected}
              usmidcapMarketInstruments={usmidcapMarketInstruments}
              ussmallcapMarketInstruments={ussmallcapMarketInstruments}
              uslargecapMarketInstruments={uslargecapMarketInstruments}
              indiaMarketInstruments={indiaMarketInstruments}
            />
          </div>
        </div>
      </div>

      <div className="basketLabel__container">
        {basketList?.map((existingbasket) =>
          existingbasket.is_favorite ? (
            <BasketLabel
              existingbasket={existingbasket} // Passes the details of user defined baskets
              passData={passData}
              setCurrentBasket={setCurrentBasket}
              deletebasket={deletebasket}
              handleCheck={handleCheck}
              setDeleteBasketClicked={setDeleteBasketClicked}
              addToFavourites={addToFavourites}
            />
          ) : (
            <></>
          )
        )}

        {baskett?.map((existingbasket) =>
          !existingbasket.is_favorite ? (
            <BasketLabel
              existingbasket={existingbasket} // Passes the details of user defined baskets
              passData={passData}
              setCurrentBasket={setCurrentBasket}
              deletebasket={deletebasket}
              handleCheck={handleCheck}
              setDeleteBasketClicked={setDeleteBasketClicked}
              addToFavourites={addToFavourites}
            />
          ) : (
            <></>
          )
        )}
      </div>

      <div className="all_baskets">
        <div className="fav_baskets mb-3"></div>

        <div className="mb-5">
          <div className="mb-2"></div>
        </div>
      </div>

      <ToastContainer />

      <div
        style={{
          position: "relative",
          top: createBasket ? "-200px" : "0px",
          zIndex: createBasket ? "-1" : "1",
        }}
      >
        <p style={{ color: "#0B81EE", fontWeight: "600" }} className="mb-4">
          BASKET DETAILS
        </p>

        <div className="create_nd_search_basket mb-4">
          <div style={{ lineHeight: "7px" }}>
            <p style={{ color: "#FFFFFF", fontSize: "1rem" }}>
              {currBasket?.name ? currBasket?.name : "Empty Basket"}
            </p>
            <p style={{ color: " rgba(134, 139, 150, 0.92)" }}>
              {currBasket?.instruments?.length
                ? `${currBasket?.instruments?.length} Instruments`
                : "No Basket Selected"}
            </p>
          </div>

          <div>
            {currentBasket ? (
              <BasketInstrumentSearch
                basketSearchValue={basketSearchValue}
                setBasketSearchValue={setBasketSearchValue}
                searchHandler={searchHandler}
                currentBasketData={currentBasketData.instruments}
                searchData={activeBasketSearchData}
                addInstrumentToBasket={addInstrumentToBasket}
                showInstrumentContainer={showInstrumentContainer}
                setShowInstrumentContainer={setShowInstrumentContainer}
                searchContainerRef={searchContainerRef}
              />
            ) : (
              ""
            )}
          </div>

          <div className="basketLayout__exportBasketData">
            {currentBasket ? (
              <ExportBasketData
                data={csvData}
                fileName={currBasket.name}
                downloadXlsx={downloadXlsx}
                headers={["Ticker", "Instrument Name"]}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Table starts from here */}
        <div
          className="basket_table mb-5"
          style={{
            position: "relative",
            top: searchVal === "" ? "0px" : "-204px",
            zIndex: searchVal === "" ? "1" : "-1",
          }}
        >
          <CreateScannerPaginationTable
            columns={columns}
            data={currBasket?.instruments ? currBasket?.instruments : []}
            editNdelete={editNdelete}
          />
        </div>
      </div>
    </div>
  );
}

export default BasketLayout;
