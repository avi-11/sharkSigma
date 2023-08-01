import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: "US",
};

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    changeCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const { changeCountry } = regionSlice.actions;
export default regionSlice.reducer;
