import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Load from "./containers/Load";
import RequestLoan from "./containers/requestLoan";
import Manager from "./containers/Manager";
import StatusChart from "./containers/Chart";
import Verify from "./containers/Verify";

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={Signup}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/load"
      exact
      component={Load}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/requestloan"
      exact
      component={RequestLoan}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/manager"
      exact
      component={Manager}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/chart"
      exact
      component={StatusChart}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/verify"
      exact
      component={Verify}
      props={childProps}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
