import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addStrategyFileSync,
  deleteStrategyFile,
  openFile,
  setStrategySettings,
  updateStrategySync,
} from "../reducer/reducer";
import { getStrategyData } from "../backtestService";

export const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  backtestData: [
    {
      id: -1,
      fileName: "main.py",
      language: "python",
      content: "# Start Scripting...",
      settingId: null,
      settings: {},
    },
  ],
  currentStrategy: {
    id: -1,
    fileName: "main.py",
    language: "python",
    content: "# Start Scripting...",
    settingId: null,
    settings: {},
  },
};

export const getBacktestData = createAsyncThunk(
  "backtest/getBacktestData",
  async (payload, thunkAPI) => {
    try {
      return await getStrategyData(payload, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const backtestSlice = createSlice({
  name: "backtest",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    updateBacktestStrategy: updateStrategySync,
    addNewBacktestFile: addStrategyFileSync,
    deleteBacktestFile: deleteStrategyFile,
    openBacktestFile: openFile,
    setCurrentStrategySettings: setStrategySettings,
  },
  extraReducers: (builder) => {
    builder.addCase(getBacktestData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBacktestData.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });
    builder.addCase(getBacktestData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.backtestData = [payload];
      state.currentStrategy = payload;
    });
  },
});

export const {
  reset,
  strategyActions,
  updateBacktestStrategy,
  addNewBacktestFile,
  deleteBacktestFile,
  openBacktestFile,
  setCurrentStrategySettings,
} = backtestSlice.actions;
export default backtestSlice.reducer;
