import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  filterActivatedStrategy,
  filterDeactivatedStrategy,
} from "../helpers/helpers";
import {
  activateUserStrategy,
  deactivateUserStrategy,
  fetchUserStrategyList,
} from "../strategyService";

let initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  strategies: [],
};

export const fetchStrategies = createAsyncThunk(
  "strategies/fetchStrategies",
  async (userID, thunkAPI) => {
    try {
      return await fetchUserStrategyList(userID, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const activateStrategy = createAsyncThunk(
  "strategies/activateStrategy",
  async (strategyID, thunkAPI) => {
    try {
      return await activateUserStrategy(strategyID, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deactivateStrategy = createAsyncThunk(
  "strategies/deactivateStrategy",
  async (strategyID, thunkAPI) => {
    try {
      return await deactivateUserStrategy(strategyID, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const strategySlice = createSlice({
  name: "strategies",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStrategies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStrategies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.strategies = payload;
      state.message = "Strategies fetched successfully";
    });
    builder.addCase(fetchStrategies.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });
    builder.addCase(activateStrategy.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.message = payload.successMessage;
      state.isSuccess = true;
      state.strategies = filterActivatedStrategy(state.strategies, payload);
    });
    builder.addCase(activateStrategy.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = payload;
    });
    builder.addCase(deactivateStrategy.fulfilled, (state, payload) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "Stategy deactivated successfully";
      state.strategies = filterDeactivatedStrategy(state.strategies, payload);
    });
    builder.addCase(deactivateStrategy.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = payload;
    });
  },
});

export const { reset, deleteStrategy } = strategySlice.actions;
export default strategySlice.reducer;
