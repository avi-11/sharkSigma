import React from "react";
import { Route } from "react-router-dom";

import AccountManagement from "../components/AdminModules/AccountManagement/AccountManagement";

function Admin() {
  return (
    <div>
      <Route path="/admin/accountManagement">
        <AccountManagement />
      </Route>
    </div>
  );
}

export default Admin;
