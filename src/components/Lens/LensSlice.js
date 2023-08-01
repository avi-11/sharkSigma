import { createSlice } from "@reduxjs/toolkit";

const data = {
  columns: 9,
  data: [
    {
      id: 1,
      cName1: "BHARTIARTL",
      cprop1: "Bharti Airtel",
      cNum1: 15,
      c2: "Bullish",
      price: 225.05,
      priceHigh: 205.5,
    },
    {
      id: 2,
      cName1: "BHARTIARTL",
      cprop1: "Bharti Airtel",
      cNum1: 15,
      c2: "Bullish",
      price: 225.05,
      priceHigh: 205.5,
    },
    {
      id: 3,
      cName1: "BHARTIARTL",
      cprop1: "Bharti Airtel",
      cNum1: 15,
      c2: "Bullish",
      price: 225.05,
      priceHigh: 205.5,
    },
    {
      id: 4,
      cName1: "BHARTIARTL",
      cprop1: "Bharti Airtel",
      cNum1: 15,
      c2: "Bullish",
      price: 225.05,
      priceHigh: 205.5,
    },
    {
      id: 5,
      cName1: "BHARTIARTL",
      cprop1: "Bharti Airtel",
      cNum1: 15,
      c2: "Bullish",
      price: 225.05,
      priceHigh: 205.5,
    },
    {
      id: 6,
      cName1: "BHARTIARTL",
      cprop1: "Bharti Airtel",
      cNum1: 15,
      c2: "Bullish",
      price: 225.05,
      priceHigh: 205.5,
    },
    {
      id: 7,
      cName1: "BHARTIARTL",
      cprop1: "Bharti Airtel",
      cNum1: 15,
      c2: "Bullish",
      price: 225.05,
      priceHigh: 205.5,
    },
  ],
};

const initialState = {
  data: data,
  isLoading: false,
};

export const LensSlice = createSlice({
  name: "Lens",
  initialState,
  reducers: {
    getData: (state, action) => {
      return state.data;
    },
  },
});

export const { getData } = LensSlice.actions;
export default LensSlice.reducer;
