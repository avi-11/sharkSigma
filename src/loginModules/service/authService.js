import axios from "axios";
import Cookies from "js-cookie";

const register = async (userData, thunkAPI) => {
  const res = await axios({
    method: "post",
    url: "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/signup",
    data: userData,
  });
  localStorage.setItem(
    "signup",
    JSON.stringify({
      login: true,
      token: res.token,
      success: true,
    })
  );

  if (res.data) {
    if (
      (res.data.response && res.data.response !== "link send to email") ||
      !res.data.response
    ) {
      return thunkAPI.rejectWithValue(res.data);
    }
  }

  return res.data;
};

const logout = () => {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie = "user_role=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  localStorage.removeItem("login");
};

const login = async (userData, thunkAPI) => {
  const res = await axios({
    method: "post",
    url: "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/login",
    data: userData,
    username: userData.username,
  });
  const resData = res.data;

  if (resData.detail === "user not found") {
    return thunkAPI.rejectWithValue("No active User Found");
  }
  if (resData.detail === "incorrect password") {
    return thunkAPI.rejectWithValue("Incorrect Password");
  }
  if (resData.detail === "User not active") {
    return thunkAPI.rejectWithValue("User not active");
  }

  localStorage.setItem(
    "login",
    JSON.stringify({
      login: true,
      token: res.token,
      success: true,
      userType: resData.user_role,
    })
  );

  Cookies.set("username", res.config.username);
  Cookies.set("user_id", resData.user_id);
  Cookies.set("user_role", resData.user_role);

  console.log(res);
  return { ...resData, username: res.config.username };
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
