import React, { useState, useEffect } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { Spring, animated } from "react-spring";
import { useSelector, useDispatch } from "react-redux";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Alert, ThemeProvider, Collapse } from "@mui/material";

import { reset, login } from "./service/slices/authSlice";

import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

import viewPassword from "./assets/viewPassword.svg";
import hidePassword from "./assets/hidePassword.svg";
import brandLogo from "../assets/Images/brandLogo.svg";

import { CssTextField } from "./CssTextField";
import "./Login.css";
import { theme } from "../assets/Style_Templates/ColorPalette";

const Login = () => {
  const [state, setState] = useState({
    username: null,
    usernameError: false,
    password: null,
    passwordError: false,
    login: false,
    success: "",
    store: null,
    notactive: false,
    isAuth: false,
    nameEntered: "",
    cookiePresent: document.cookie,
    showPassword: false,
  });

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      if (message === "No active User Found") {
        setState((state) => ({
          ...state,
          usernameError: true,
          passwordError: true,
        }));
      } else if (message === "Incorrect Password") {
        setState((state) => ({ ...state, passwordError: true }));
      } else if (message === "User not active") {
        setState((state) => ({ ...state, notactive: true }));
      }
    }

    if (isSuccess) {
      setState((state) => ({ ...state, isAuth: true }));
    }

    // dispatch(reset());
  }, [isError, isSuccess]);

  function checkEmpty() {
    let errCount = 0;
    if (!state.username) {
      setState((state) => ({ ...state, usernameError: true }));
      errCount++;
    } else {
      setState((state) => ({ ...state, usernameError: false }));
    }

    if (!state.password) {
      setState((state) => ({ ...state, passwordError: true }));
      errCount++;
    } else {
      setState((state) => ({ ...state, passwordError: false }));
    }

    return errCount;
  }

  function loginUser() {
    dispatch(reset());
    if (checkEmpty() === 2) {
      return;
    }

    dispatch(login(state));

    // if (result.data.jwt) {
    //   setState((state) => ({
    //     ...state,
    //     login: true,
    //     success: "yeah",
    //     isAuth: true,
    //   }));
    //   const nameEntered = result.config.username;
    //   setState((state) => ({ ...state, nameEntered: nameEntered }));
    // }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="loginTwo">
      {state.cookiePresent !== "" ? <Redirect to="/dashboard" /> : null}

      {state.isAuth === false ? (
        <section className="loginTwo__section">
          <div className="loginTwo__section--mainContainer">
            <Spring from={{ x: -200 }} to={{ x: 0 }}>
              {(styles) => (
                <animated.div
                  style={styles}
                  className="loginTwo__section--imgContainer"
                >
                  <img src={brandLogo} alt="" />
                </animated.div>
              )}
            </Spring>

            <Spring from={{ opacity: -5 }} to={{ opacity: 1 }}>
              {(styles) => (
                <animated.div
                  style={styles}
                  className="loginTwo__section--formContainer"
                >
                  <form onSubmit={handleSubmit}>
                    <h1 className="loginTwo__formHeading">
                      Login to
                      <strong className="loginTwo__formHeading--brand">
                        {" "}
                        Shark Sigma
                      </strong>
                    </h1>

                    <br />

                    <div
                      style={{
                        display: `${!state.notactive ? "none" : "block"}`,
                        backgroundColor: "#DE1A1A",
                        margin: "0.5rem 0rem",
                        textAlign: "center",
                        padding: "0.25rem 0rem",
                        color: "white",
                      }}
                    >
                      User is not activated, please check the mail.
                    </div>

                    <div
                      style={{
                        display: `${
                          state.success === "nope" ? "block" : "none"
                        }`,
                        backgroundColor: "#DE1A1A",
                        margin: "0.5rem 0rem",
                        textAlign: "center",
                        padding: "0.25rem 0rem",
                        color: "white",
                        transition: "display 0.5s ease-in-out",
                      }}
                      className="loginTwo__form--errorMsg"
                    >
                      Invalid username or password
                      <br />
                    </div>

                    <ThemeProvider theme={theme}>
                      <Collapse in={isError}>
                        <Alert
                          severity="error"
                          sx={{ width: "100%" }}
                          variant="outlined"
                          style={{
                            visibility: `${isError ? "visible" : "hidden"}`,
                          }}
                        >
                          {message?.message || message}
                        </Alert>
                      </Collapse>
                    </ThemeProvider>

                    <CssTextField
                      label="Username"
                      variant="outlined"
                      color="primary"
                      required="true"
                      type="text"
                      fullWidth="true"
                      onChange={(e) => {
                        setState((state) => ({
                          ...state,
                          username: e.target.value,
                          success: "",
                          usernameError: false,
                        }));
                      }}
                      size="small"
                      name="username"
                      error={state.usernameError || state.success === "nope"}
                      helperText={state.usernameError ? "Invalid username" : ""}
                    />

                    <p className="loginTwo__form--usernameFormat">
                      Required | 150 characters or fewer | Letters,digits and
                      @/./+/-/_ only.
                    </p>

                    <CssTextField
                      onChange={(e) => {
                        setState((state) => ({
                          ...state,
                          password: e.target.value,
                          passwordError: false,
                          success: "",
                        }));
                      }}
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setState((state) => ({
                                  ...state,
                                  showPassword: !state.showPassword,
                                }))
                              }
                              // onMouseDown={viewPassword}
                            >
                              {state.showPassword ? (
                                <img src={hidePassword} alt="" />
                              ) : (
                                <img src={viewPassword} alt="" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      size="small"
                      label="Password"
                      variant="outlined"
                      color="primary"
                      required="true"
                      type={state.showPassword ? "text" : "password"}
                      fullWidth="true"
                      name="password"
                      error={state.passwordError || state.success === "nope"}
                      helperText={state.passwordError ? "Invalid Password" : ""}
                    />

                    <Route
                      path="/forgot-password"
                      component={ForgotPassword}
                    ></Route>

                    <p className="loginTwo__forgotPassLink">
                      <Link to="/forgot-password">Forgot Password ?</Link>
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginTop: "1.5rem",
                      }}
                    >
                      <button
                        className="loginTwo__form--LoginBtn"
                        onClick={() => {
                          if (!isLoading) loginUser();
                        }}
                      >
                        {isLoading ? "Loading..." : "Log In"}
                      </button>

                      <Route path="/signup" component={SignUp}></Route>
                      <p className="loginTwo__signupLink">
                        New User ? <Link to="/signup"> Create an Account</Link>
                      </p>
                    </div>
                  </form>
                </animated.div>
              )}
            </Spring>
          </div>
        </section>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </div>
  );
};

export default Login;
