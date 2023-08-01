import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../loginModules/service/slices/authSlice";
import lensReducer from "../components/Lens/LensSlice";
import basketReducer from "../components/Baskets/services/slices/basketSlice";
import backtestReducer from "../components/BacktestStrategies/services/slices/backtestSlice";
import strategiesReducer from "../components/Strategies/services/strategySlice/strategySlice";
import regionReducer from "../components/header/service/navbarSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lens: lensReducer,
    basket: basketReducer,
    backtest: backtestReducer,
    strategies: strategiesReducer,
    region: regionReducer,
  },
});

export default store;
