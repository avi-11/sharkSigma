import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  basketList: [],
  currBasket: {},
  loading: false,
  error: false,
  success: false,
  message: "",
  action: "",
};

export const fetchBasket = createAsyncThunk(
  "basket/fetchBasket",
  async (user, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/all?user_id=${user}`
      );
      const resData = res.data.data;
      return resData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postBasket = createAsyncThunk(
  "basket/postBasket",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(
        `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/add?user_id=${payload.user}`,
        payload.data
      );
      const resData = res.data.message;
      return {
        message: resData,
        data: {
          name: payload.data.basket_name,
          market: payload.data.market_name,
          instruments: payload.data.instruments.slice(1, -1).split(","),
          is_favorite: false,
        },
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBasket = createAsyncThunk(
  "basket/deleteBasket",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(
        `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/delete?basket_id=${payload.id}`
      );
      const resData = res.data.message;
      return {
        message: resData,
        name: payload.name,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBasket = createAsyncThunk(
  "basket/updateBasket",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(
        `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/edit?user_id=${payload.user}`,
        payload.data
      );
      const resData = res.data.message;
      return {
        message: resData,
        data: {
          name: payload.data.basket_name,
          market: payload.data.market_name,
          instruments: payload.data.instruments.slice(1, -1).split(","),
          is_favorite: payload.data.is_favorite,
        },
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateInsBasket = createAsyncThunk(
  "basket/updateInsBasket",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const newInstruments = [...payload.data.instruments];

      if (
        payload.instrument[0] &&
        !newInstruments.includes(payload.instrument[0])
      ) {
        newInstruments.push(payload.instrument[0]);
      }

      const ins = newInstruments.join(",");

      const data = { ...payload.data, instruments: ins };
      console.log(data, ins);

      const res = await axios.post(
        `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/edit?user_id=${payload.user}`,
        data
      );
      const resData = res.data.message;
      return {
        message: resData,
        data: {
          id: data.id,
          name: data.basket_name,
          market: data.market_name,
          instruments: data.instruments.split(","),
          newIns: {
            Ticker: payload.instrument[0],
            "Instrument Name": payload.instrument[1],
          },
        },
        basket: data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateInsDelBasket = createAsyncThunk(
  "basket/updateInsDelBasket",
  async (payload, thunkAPI) => {
    try {
      let newInstruments = payload.data.instruments.filter(
        (item) => item.Ticker !== payload.instrument
      );
      const ins = newInstruments.map((item) => item.Ticker).join(",");

      const data = { ...payload.data, instruments: ins };

      const res = await axios.post(
        `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/edit?user_id=${payload.user}`,
        data
      );
      const resData = res.data.message;
      return {
        message: resData,
        data: {
          id: data.id,
          name: data.basket_name,
          market: data.market_name,
          instruments: data.instruments.split(","),
          currBasketIns: newInstruments,
        },
        basket: data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
    changeCurrentBasket: (state, action) => {
      state.currBasket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBasket.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.action = "fetch";
    });
    builder.addCase(fetchBasket.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload;
      state.action = "fetch";
    });
    builder.addCase(fetchBasket.fulfilled, (state, { payload }) => {
      state.success = true;
      state.loading = false;
      state.error = false;
      state.message = "";
      state.basketList = payload;
      state.action = "fetch";
    });
    builder.addCase(postBasket.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.action = "post";
    });
    builder.addCase(postBasket.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload;
      state.action = "post";
    });
    builder.addCase(postBasket.fulfilled, (state, { payload }) => {
      state.success = true;
      state.loading = false;
      state.error = false;
      state.message = payload.message;
      state.action = "post";
      state.basketList = [...state.basketList, payload.data];
    });
    builder.addCase(deleteBasket.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.action = "delete";
    });
    builder.addCase(deleteBasket.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload;
      state.action = "delete";
    });
    builder.addCase(deleteBasket.fulfilled, (state, { payload }) => {
      state.success = true;
      state.loading = false;
      state.error = false;
      state.message = payload.message;
      state.action = "delete";
      state.basketList = state.basketList.filter(
        (bas) => bas.name !== payload.name
      );
      state.currBasket = {};
    });
    builder.addCase(updateBasket.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.action = "update";
    });
    builder.addCase(updateBasket.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload;
      state.action = "update";
    });
    builder.addCase(updateBasket.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.success = true;
      state.loading = false;
      state.error = false;
      state.message = payload.message;
      state.action = "update";
      state.basketList = state.basketList.map((basket) => {
        if (basket.name == payload.data.name) {
          return { ...basket, is_favorite: payload.data.is_favorite };
        }
        return basket;
      });
    });
    builder.addCase(updateInsBasket.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.action = "update";
    });
    builder.addCase(updateInsBasket.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload;
      state.action = "update";
    });
    builder.addCase(updateInsBasket.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.success = true;
      state.loading = false;
      state.error = false;
      state.message = payload.message;
      if (payload.message == "basket updated successfully") {
        state.currBasket = {
          ...state.currBasket,
          instruments: [...state.currBasket.instruments, payload.data.newIns],
        };
        state.action = "update";
        state.basketList = state.basketList.map((basket) => {
          if (basket.name == payload.data.name) {
            return { ...basket, instruments: payload.data.instruments };
          }
          return basket;
        });
      }
    });
    builder.addCase(updateInsDelBasket.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.action = "update";
    });
    builder.addCase(updateInsDelBasket.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload;
      state.action = "update";
    });
    builder.addCase(updateInsDelBasket.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.success = true;
      state.loading = false;
      state.error = false;
      state.action = "update";
      state.message = payload.message;
      state.currBasket = {
        ...state.currBasket,
        instruments: payload.data.currBasketIns,
      };
      state.basketList = state.basketList.map((basket) => {
        if (basket.name == payload.data.name) {
          return { ...basket, instruments: payload.data.instruments };
        }
        return basket;
      });
    });
  },
});

export const { changeCurrentBasket } = basketSlice.actions;
export default basketSlice.reducer;
