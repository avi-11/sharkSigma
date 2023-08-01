import React from "react";
import { useState } from "react";
import Login from "./Login";
import OTP from "./OTP";
import Verify from "./Verify";

function Auth() {
  const [auth, setAuth] = useState("log");
  return (
    <div>
      {auth === "log" && <Login auth={auth} setAuth={setAuth} />}
      {auth === "otp" && <OTP auth={auth} setAuth={setAuth} />}
      {auth === "verify" && <Verify />}
    </div>
  );
}

export default Auth;
