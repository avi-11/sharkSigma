import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../authService";

let user = {};
if (document.cookie) {
  const values = document.cookie.split(";");
  values.forEach((value) => {
    const [k, v] = value.split("=");
    user[k.trim()] = v;
  });
}

const initialState = {
  user: user.username ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user, thunkAPI);
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout User
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
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
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
