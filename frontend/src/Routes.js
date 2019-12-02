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
import GetTwitter from "./containers/GetTwitter";
import PostTwitter from "./containers/PostTwitter";
import GetUser from "./containers/GetUser";
import PostSearch from "./containers/PostSearch";
import PostSearchA from "./containers/PostSearch";
import DeleteTwitter from "./containers/DeleteTwitter";
import GetUserPost from "./containers/GetUserPost";
import Follow from "./containers/Follow";
import GetUserFollowers from "./containers/GetUserFollowers";
import GetUserFollowing from "./containers/GetUserFollowing";
import GetMedia from "./containers/GetMedia";
import AddMedia from "./containers/AddMedia";
import LikeUser from "./containers/LikeUser";

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
    <AuthenticatedRoute
      path="/gettwitter"
      exact
      component={GetTwitter}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/posttwitter"
      exact
      component={PostTwitter}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/PostSearchA"
      exact
      component={PostSearchA}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/PostSearch"
      exact
      component={PostSearch}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/GetUserPost"
      exact
      component={GetUserPost}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/GetUserFollowers"
      exact
      component={GetUserFollowers}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/GetUserFollowing"
      exact
      component={GetUserFollowing}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/getuser"
      exact
      component={GetUser}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/deletetwitter"
      exact
      component={DeleteTwitter}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/follow"
      exact
      component={Follow}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/addmedia"
      exact
      component={AddMedia}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/verify"
      exact
      component={Verify}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/media"
      exact
      component={GetMedia}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/likeItem"
      exact
      component={LikeUser}
      props={childProps}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
