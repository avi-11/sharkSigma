import React, { useState, useEffect } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { Spring, animated } from "react-spring";
import { useSelector, useDispatch } from "react-redux";

import SignupSuccess from "./SignupSuccess";
import Login from "./Login";

import { register, reset } from "./service/slices/authSlice";

import viewPassword from "./assets/viewPassword.svg";
import hidePassword from "./assets/hidePassword.svg";
import brandLogo from "../assets/Images/brandLogo.svg";

import { CssTextField } from "./CssTextField";
import "./SignUp.css";

import { InputAdornment, IconButton } from "@material-ui/core";

export default function SignUp() {
  const [state, setState] = useState({
    username: null,
    first_name: null,
    last_name: null,
    licensekey: null,
    email: null,
    error: false,
    notvalidemail: false,
    passmatch: true,
    userexists: false,
    password1: null,
    password2: null,
    signup: false,
    redirectsuccess: false,
    success: "",
    short: false,
    wronglicense: false,
    store: null,
    uniquemail: true,
    cookiePresent: document.cookie,
    showPassword: false,
    showConfirmPassword: false,
  });
  const [error, setError] = useState({
    usernameError: false,
    firstnameError: false,
    lastnameError: false,
    emailError: false,
    passwordError: false,
    confirmpasswordError: false,
    licensekeyError: false,

    emailSyntax: false,
    passwordUnmatch: false,
  });

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      if (
        message.username === "This field may not be null." ||
        message.password2 === "Tshis field may not be null." ||
        message.password1 === "This field may not be null." ||
        message.first_name === "This field may not be null." ||
        message.last_name === "This field may not be null." ||
        message.licensekey === "This field may not be null." ||
        message.email === "This field may not be null"
      ) {
        setState((state) => ({ ...state, signup: false, success: "nope" }));
      } else {
        setState((state) => ({ ...state, success: "yes" }));
      }

      if (message.email && message.email.length > 0) {
        if (message.email[0] === "Enter a valid email address.") {
          setState((state) => ({ ...state, notvalidemail: true }));
        } else if (message.email[0] === "This field must be unique.") {
          setState((state) => ({ ...state, notvalidemail: true }));
        } else {
          setState((state) => ({ ...state, notvalidemail: false }));
        }
      }

      if (message.password1 && message.password1.length > 0) {
        if (
          message.password1[0] ===
          "This password is too short. It must contain at least 8 characters."
        ) {
          setState((state) => ({
            ...state,
            short: true,
            signup: false,
            success: "nope",
          }));
        } else {
          setState((state) => ({ ...state, short: false }));
        }
      }

      if (message.password === "Password fields didn't match.") {
        setState((state) => ({ ...state, passmatch: false }));
      } else {
        setState((state) => ({ ...state, passmatch: true }));
      }

      if (message.username && message.username.length > 0) {
        if (
          message.username[0] === "A user with that username already exists."
        ) {
          setState((state) => ({
            ...state,
            userexists: true,
            signup: false,
            success: "nope",
          }));
        } else {
          setState((state) => ({ ...state, userexists: false }));
        }
      }

      if (message.licensekey === "invalid licensekey.") {
        setState((state) => ({
          ...state,
          wronglicense: true,
          signup: false,
          success: "nope",
        }));
      } else {
        setState((state) => ({ ...state, wronglicense: false }));
      }

      if (message.email === "This field must be unique.") {
        setState((state) => ({ ...state, uniquemail: false }));
      } else {
        setState((state) => ({ ...state, uniquemail: true }));
      }
    }

    if (isSuccess) {
      setState((state) => ({ ...state, redirectsuccess: true }));
      console.log("Success");
    }

    console.log("Re-render");

    dispatch(reset());

    console.log("error2", error);
    console.log("state2", state);
  }, [user, isError, isSuccess, message]);

  const checkInputs = () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (state.first_name) {
      error.firstnameError = false;
    } else {
      error.firstnameError = true;
      return;
    }

    if (state.last_name) {
      error.lastnameError = false;
    } else {
      error.lastnameError = true;
      return;
    }

    if (state.username) {
      error.usernameError = false;
    } else {
      error.usernameError = true;
      return;
    }

    if (re.test(state.email)) {
      error.emailError = false;
    } else {
      error.emailError = true;
      return;
    }

    if (state.password1) {
      error.passwordError = false;
    } else {
      error.passwordError = true;
      return;
    }

    if (state.password2) {
      error.confirmpasswordError = false;
    } else {
      error.confirmpasswordError = true;
      return;
    }

    if (state.password1 !== state.password2) {
      error.passwordUnmatch = true;
      return;
    }

    if (state.licensekey) {
      error.licensekeyError = false;
    } else {
      error.licensekeyError = true;
      return;
    }
  };

  function signup() {
    setState((state) => ({ ...state, success: "" }));
    checkInputs();

    if (
      error.firstnameError ||
      error.lastnameError ||
      error.usernameError ||
      error.emailError ||
      error.password1 ||
      error.password2 ||
      error.passwordUnmatch ||
      error.licensekeyError
    ) {
      setState({ ...state, error: true });
      return;
    }

    dispatch(register(state));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="loginTwo">
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
                className="loginTwo__section--formContainer signUp__fromContainer"
              >
                <form onSubmit={handleSubmit} className="">
                  <h1 className="signUp__heading">Sign up to get started</h1>
                  <p className="signUp__intro">
                    Shark Sigma is an institution-grade risk management platform
                    for traders and investors.
                  </p>

                  <br />

                  {state.success === "nope" ? (
                    <div
                      style={{
                        backgroundColor: "#DE1A1A",
                        margin: "0.5rem 0rem",
                        textAlign: "center",
                        padding: "0.25rem 0rem",
                        color: "white",
                      }}
                    >
                      Please check all the fields
                    </div>
                  ) : null}

                  {state.redirectsuccess === true ? (
                    <Redirect to="/signupsuccess" component={SignupSuccess} />
                  ) : null}

                  <div className="signUp__form--name">
                    <CssTextField
                      type="text"
                      label="First Name"
                      name="first_name"
                      id="firstname outlined-error-helper-text"
                      onChange={(e) => {
                        setState({ ...state, first_name: e.target.value });
                        if (!e.target.value || !e.target.value.trim()) {
                          error.firstnameError = true;
                        } else {
                          error.firstnameError = false;
                        }
                      }}
                      style={{
                        marginRight: "5px",
                      }}
                      size="small"
                      required="true"
                      variant="outlined"
                      color="primary"
                      fullWidth="true"
                      error={error.firstnameError}
                      helperText={
                        error.firstnameError ? "First Name Required" : ""
                      }
                    />

                    <span></span>

                    <CssTextField
                      type="text"
                      label="Last Name"
                      name="last_name"
                      id="lastname"
                      onChange={(e) => {
                        setState({ ...state, last_name: e.target.value });
                        if (!e.target.value || !e.target.value.trim()) {
                          error.lastnameError = true;
                        } else {
                          error.lastnameError = false;
                        }
                      }}
                      size="small"
                      required="true"
                      variant="outlined"
                      color="primary"
                      fullWidth="true"
                      error={error.lastnameError}
                      helperText={
                        error.lastnameError ? "Last Name Required" : ""
                      }
                    />
                  </div>

                  <CssTextField
                    label="Username"
                    variant="outlined"
                    color="primary"
                    required="true"
                    type="text"
                    onChange={(e) => {
                      setState({
                        ...state,
                        username: e.target.value,
                        userexists: false,
                      });
                      if (!e.target.value || !e.target.value.trim()) {
                        error.usernameError = true;
                      } else {
                        error.usernameError = false;
                      }
                    }}
                    size="small"
                    name="username"
                    id="username"
                    fullWidth="true"
                    error={error.usernameError || state.userexists}
                    helperText={
                      error.usernameError
                        ? "Username Required"
                        : state.userexists
                        ? "Username already taken"
                        : ""
                    }
                  />

                  {/* <div className="" style={{display: `${state.userexists ? 'block' : 'none'}`, color: 'red', fontSize: '13px', lineHeight: '0', marginBottom:'1.5rem', paddingLeft: '1rem'}}>A user with the username already exists</div> */}

                  <CssTextField
                    type="email"
                    className=""
                    label="Email"
                    name="email"
                    id="email"
                    onChange={(e) => {
                      setState({
                        ...state,
                        email: e.target.value,
                        notvalidemail: false,
                      });
                      if (!e.target.value || !e.target.value.trim()) {
                        error.emailError = true;
                      } else {
                        error.emailError = false;
                      }
                    }}
                    size="small"
                    required="true"
                    variant="outlined"
                    color="primary"
                    fullWidth="true"
                    error={error.emailError || state.notvalidemail}
                    helperText={
                      error.emailError
                        ? "Email Address Invalid"
                        : state.notvalidemail
                        ? "Email already in use"
                        : ""
                    }
                  />
                  {/* <div style={{display: `${state.notvalidemail ? 'block' : 'none'}`, color: 'red', fontSize: '13px', lineHeight: '0', marginBottom:'1.5rem', paddingLeft: '1rem'}} className="">Email already registered</div> */}

                  {console.log(state)}

                  {/* <div className="alert Errortextcolor"></div> */}

                  <CssTextField
                    type={state.showPassword ? "text" : "password"}
                    className=""
                    label="Password"
                    name="password1"
                    id="password1"
                    onChange={(e) => {
                      setState({
                        ...state,
                        password1: e.target.value,
                        short: false,
                      });
                      error.passwordUnmatch = false;
                      if (!e.target.value || !e.target.value.trim()) {
                        error.passwordError = true;
                      } else {
                        error.passwordError = false;
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setState({
                                ...state,
                                showPassword: !state.showPassword,
                              })
                            }
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
                    required="true"
                    variant="outlined"
                    color="primary"
                    fullWidth="true"
                    error={
                      error.passwordError ||
                      error.passwordUnmatch ||
                      state.short
                    }
                    helperText={
                      error.passwordError
                        ? "Password not valid"
                        : error.passwordUnmatch
                        ? "Passwords do not match"
                        : state.short
                        ? "Password too short"
                        : ""
                    }
                  />

                  {/* <div className="alert Errortextcolor"></div> */}

                  <CssTextField
                    type={state.showConfirmPassword ? "text" : "password"}
                    className=""
                    label="Confirm password"
                    name="password2"
                    id="password2"
                    onChange={(e) => {
                      setState({
                        ...state,
                        password2: e.target.value,
                        short: false,
                      });
                      error.passwordUnmatch = false;
                      if (!e.target.value || !e.target.value.trim()) {
                        error.confirmpasswordError = true;
                      } else {
                        error.confirmpasswordError = false;
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setState({
                                ...state,
                                showConfirmPassword: !state.showConfirmPassword,
                              })
                            }
                          >
                            {state.showConfirmPassword ? (
                              <img src={hidePassword} alt="" />
                            ) : (
                              <img src={viewPassword} alt="" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    required="true"
                    variant="outlined"
                    color="primary"
                    fullWidth="true"
                    error={
                      error.confirmpasswordError ||
                      error.passwordUnmatch ||
                      state.short
                    }
                    helperText={
                      error.confirmpasswordError
                        ? "Incorrect Entry"
                        : error.passwordUnmatch
                        ? "Passwords do not match"
                        : state.short
                        ? "Password too short"
                        : ""
                    }
                  />

                  {/* {state.passmatch===false?<div style={{display: `${!state.passmatch ? 'block' : 'none'}`, color: 'red', fontSize: '13px', lineHeight: '0', marginBottom:'1.5rem', paddingLeft: '1rem'}} >Passwords donot match</div>:null} */}

                  {/* {state.short===true?<div style={{display: `${state.short ? 'block' : 'none'}`, color: 'red', fontSize: '13px', lineHeight: '0', marginBottom:'1.5rem', paddingLeft: '1rem'}} >Password is too short</div>:null } */}

                  <CssTextField
                    type="text"
                    className=""
                    label="License Key"
                    name="licensekey"
                    id="licensekey"
                    onChange={(e) => {
                      setState({
                        ...state,
                        licensekey: e.target.value,
                        wronglicense: false,
                      });
                      if (!e.target.value || !e.target.value.trim()) {
                        error.licensekeyError = true;
                      } else {
                        error.licensekeyError = false;
                      }
                    }}
                    size="small"
                    required="true"
                    variant="outlined"
                    color="primary"
                    fullWidth="true"
                    error={error.licensekeyError || state.wronglicense}
                    helperText={
                      error.licensekeyError
                        ? "License Key Required"
                        : state.wronglicense
                        ? "Invalid License Key"
                        : ""
                    }
                  />

                  {/* {state.wronglicense===true?<div style={{backgroundColor: '#DE1A1A', margin: '0.5rem 0rem', textAlign: 'center', padding: '0.25rem 0rem', color: 'white'}}>Wrong License Key</div>:null} */}

                  <p style={{ marginTop: "0.75rem" }}>
                    By continuing you agree to the Shark Sigma terms of service
                    and privacy policy.
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <button
                      onClick={() => {
                        signup();
                      }}
                      className="loginTwo__form--LoginBtn"
                    >
                      SIGN UP{" "}
                    </button>

                    <Route path="/login" component={Login}></Route>
                    <p className="loginTwo__signupLink">
                      Already have an account?{" "}
                      <strong style={{ letterSpacing: "1px" }}>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          Login
                        </Link>
                      </strong>
                    </p>
                  </div>

                  <br />
                </form>
              </animated.div>
            )}
          </Spring>
        </div>
      </section>
    </div>
  );
}
