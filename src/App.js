import { Route, useLocation } from "react-router-dom";
import { useState } from "react";

import "./index.css";
import "./App.css";
import "./Variables.css";

import SignUp from "./loginModules/SignUp";
import ForgotPassword from "./loginModules/ForgotPassword";
import ResetPassword from "./loginModules/ResetPassword";
import UserActivated from "./loginModules/UserActivated";
import SignupSuccess from "./loginModules/SignupSuccess";
import LandingPage from "./loginModules/LandingPage";
import Login from "./loginModules/Login";

import AppContainer from "./AppContainer";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app">
      <Route exact path="/login" component={Login} />

      <Route exact path="/signup" component={SignUp} />

      <Route exact path="/forgot-password" component={ForgotPassword} />

      <Route
        exact
        path="/password_reset/:uidb64/:token"
        component={ResetPassword}
      />

      <Route exact path="/activate/:id/:tokennum" component={UserActivated} />

      <Route exact path="/signupsuccess" component={SignupSuccess} />

      <Route exact path="/" component={LandingPage} />

      {/* Routes with Navbar */}
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/password_reset/:uidb64/:token" &&
        location.pathname !== "/activate/:id/:tokennum" &&
        location.pathname !== "/signupsuccess" &&
        location.pathname !== "/" && (
          <AppContainer
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}
      {console.log(document.cookie)}
    </div>
  );
}

export default App;
