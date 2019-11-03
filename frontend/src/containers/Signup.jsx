import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

import "./Signup.css";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      username: ""
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.username.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { email, password, username, role } = this.state;
    let data = JSON.stringify({
      email: email,
      password: password,
      username: username
    });
    axios
      .post("http://130.245.169.40/adduser", data, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(result => {
        this.props.history.push("/login");
        alert("congratulation, you have been registered");
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
        alert("user already exist.");
      });
    await this.props.saveEmail(this.state.email);
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              value={this.state.username}
              onChange={this.handleChange}
              type="name"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Sign Up"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}

export default Login;
