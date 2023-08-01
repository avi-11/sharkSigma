import { Route } from "react-router-dom";

import Topbar from "./components/header/Topbar";
import Navbar from "./components/header/Navbar";

import Backtesting from "./pages/backtesting";
import Basket from "./pages/baskets";
import Strategies from "./pages/strategies";
import Admin from "./pages/admin";
import ErrorPages from "./pages/errorPages";
import CreateScannner from "./pages/create_scannner";
import Scanner from "./pages/scanner";

import UserProfile from "./components/UserProfile/UserProfile";
import MarketOverview from "./components/MarketOverview/MarketOverview";
import Charting from "./components/Charting/Charting";
import Chart from "./components/TVChartContainer/Chart";
import Lens from "./components/Lens/Lens";
import Dashboard from "./components/Dashboard/Dashboard";
import Orderbook from "./components/Orderbook/Orderbook";
import Brokerage from "./components/Brokerage/Brokerage";

const AppContainer = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div>
      <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div>
        <Navbar sidebarOpen={sidebarOpen} />
        <div className="outer__mainContainer">
          <div
            style={{
              width: sidebarOpen ? "97.5%" : "96%",
              paddingTop: "3rem",
              paddingLeft: sidebarOpen ? "19rem" : "8rem",
            }}
          >
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>

            <Route exact path="/marketOverview">
              <MarketOverview />
            </Route>

            <Route path="/create_scanner">
              <CreateScannner />
            </Route>

            <Route path="/scanner" exact>
              <Scanner />
            </Route>

            <Route path="/backtesting">
              <Backtesting />
            </Route>

            <Route path="/baskets">
              <Basket />
            </Route>

            <Route path="/brokerage">
              <Brokerage />
            </Route>

            <Route path="/strategies">
              <Strategies />
            </Route>

            <Route path="/admin">
              <Admin />
            </Route>

            <Route path="/chart">
              <Charting />
            </Route>

            <Route path="/charts">
              <Chart />
            </Route>

            <Route path="/lens">
              <Lens />
            </Route>

            <Route path="/orderbook">
              <Orderbook />
            </Route>

            <Route path="/error">
              <ErrorPages />
            </Route>

            <Route path="/profile">
              <UserProfile />
            </Route>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppContainer;
