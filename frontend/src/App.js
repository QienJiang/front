import React, { Component, Fragment } from "react";
import Routes from "./Routes";
import { Link, withRouter } from "react-router-dom";

import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserMenu from "./Menu/userMenu";
import ManagerMenu from "./Menu/ManagerMenu";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      email: "",
      role: "",
      ssn: ""
    };
  }
  async componentDidMount() {
    try {
      this.userHasAuthenticated(false);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  handleLogout = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { timestamp, limit, q, username, following } = this.state;
    let data = JSON.stringify({});

    axios.defaults.withCredentials = true;
    axios
      .post("http://130.245.168.66/logout", data, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(result => {
        this.userHasAuthenticated(false);
        this.props.history.push("/login");
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        alert("invalid user name or password");
        this.setState({ isLoading: false });
      });
  };

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };
  saveRole = role => {
    this.setState({ role: role });
    console.log("state role", this.state.role);
  };
  saveEmail = email => {
    this.setState({ email: email });
    console.log("state email", this.state.email);
  };
  saveSSN = ssn => {
    this.setState({ ssn: ssn });
    console.log("state ssn", this.state.ssn);
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      state: this.state,
      saveRole: this.saveRole,
      saveEmail: this.saveEmail,
      saveSSN: this.saveSSN
    };

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" onClick={this.handleLogout}>
                Pigeon Twitter
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated ? (
                <NavItem onClick={this.handleLogout}>Logout</NavItem>
              ) : (
                <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/PostSearch">
                    <NavItem>Search</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/GetUserPost">
                    <NavItem>Get User Post</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/GetUserFollowers">
                    <NavItem>Get User Followers</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/GetUserFollowing">
                    <NavItem>Get User Following</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/getuser">
                    <NavItem>Get User</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/media">
                    <NavItem>Get Media</NavItem>
                  </LinkContainer>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ float: "left" }}>
          {this.state.isAuthenticated == true ? (
            <ManagerMenu
              childProps={childProps}
              user={this.state.user}
              history={this.props.history}
            />
          ) : (
            <div />
          )}
        </div>
        <div style={{ float: "left" }}>
          {this.state.isAuthenticated && this.state.role == "user" ? (
            <UserMenu
              childProps={childProps}
              user={this.state.user}
              history={this.props.history}
            />
          ) : (
            <div />
          )}
        </div>
        <Routes
          style={{ float: "right" }}
          childProps={childProps}
          ssn={this.state.ssn}
        />
      </div>
    );
  }
}

export default withRouter(App);
