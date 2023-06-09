import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import RiskOwnerLayout from "layouts/RiskOwner.js";
import GovernanceLayout from "layouts/Governance.js";
import { LoginDataProvider } from "views/examples/LoginDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <LoginDataProvider>
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/riskOwner" render={(props) => <RiskOwnerLayout {...props} />} />
      <Route path="/governance" render={(props) => <GovernanceLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>
  </LoginDataProvider>
);
