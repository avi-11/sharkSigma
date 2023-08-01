import { combineReducers } from "@reduxjs/toolkit";
import { login, logout, signup } from "../loginModules/service/reducer/reducer";

const rootReducer = combineReducers({
  login,
  logout,
  signup,
});

const reducerFunction = (state, action) => {
  return rootReducer(state, action);
};

export default reducerFunction;
