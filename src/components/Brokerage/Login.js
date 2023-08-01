import React from "react";
import { CssTextField } from "../../loginModules/CssTextField";
import { InputAdornment, IconButton } from "@material-ui/core";
import { useState } from "react";
import { Spring, animated } from "react-spring";
import viewPassword from "../../loginModules/assets/viewPassword.svg";
import hidePassword from "../../loginModules/assets/hidePassword.svg";
import styles from "./brokerage.module.css";

function Login({ auth, setAuth }) {
  const [state, setState] = useState({
    username: null,
    usernameError: false,
    ApiKey: null,
    ApiKeyError: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.brokerage_login}>
      <h2 style={{ color: "#F1F2F3", margin: "2rem" }}>
        Login to brokerage app by using
      </h2>
      <div className={styles.loginBox}>
        <div className={styles.brokerage_loginSwitch}>
          <div className={styles.brokerage_loginSwitch_API}>
            <h3 style={{ color: "#9989FB" }}>API Key</h3>
          </div>

          <div className={styles.brokerage_loginSwitch_Username}>
            <h3 style={{ color: "#9989FB" }}>Username</h3>
          </div>
        </div>
        <div className={styles.brokerage_login_inputs}>
          <Spring from={{ opacity: -5 }} to={{ opacity: 1 }}>
            {(styles) => (
              <animated.div
                style={styles}
                className="loginTwo__section--formContainer"
              >
                <form onSubmit={handleSubmit}>
                  {/* <h1 className="loginTwo__formHeading">
                  Login to
                  <strong className="loginTwo__formHeading--brand">
                    {" "}
                    Shark Sigma
                  </strong>
                </h1> */}

                  <br />

                  {/* <div
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
                    </div> */}

                  {/* <ThemeProvider theme={theme}>
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
                    </ThemeProvider> */}

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
                  <p className="loginTwo__form--usernameFormat">
                    Required | 150 characters or fewer | Letters,digits and
                    @/./+/-/_ only.
                  </p>

                  {/* <Route
                      path="/forgot-password"
                      component={ForgotPassword}
                    ></Route> */}

                  {/* <p className="loginTwo__forgotPassLink">
                      <Link to="/forgot-password">Forgot Password ?</Link>
                    </p> */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginTop: "1.5rem",
                    }}
                  >
                    <button
                      onClick={() => setAuth("otp")}
                      className="loginTwo__form--LoginBtn"
                    >
                      Log in
                    </button>
                  </div>
                </form>
              </animated.div>
            )}
          </Spring>
        </div>
      </div>
    </div>
  );
}

export default Login;
