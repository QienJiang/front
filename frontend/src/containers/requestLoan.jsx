import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

import "./Login.css";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      loanid: "",
      name: "",
      ramounnt: "",
      ssnumber: "",
      email: ""
    };
  }

  validateForm() {
    return (
      this.state.loanid.length > 0 &&
      this.state.name.length > 0 &&
      this.state.ramounnt.length > 0 &&
      this.state.ssnumber.length > 0
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
    const { loanid, name, ramounnt, ssnumber, email } = this.state;
    let data = JSON.stringify({
      loanid: loanid,
      name: name,
      ramounnt: ramounnt,
      ssnumber: ssnumber,
      email: this.props.state.email
    });

    axios
      .post("http://localhost:8080/loan/requestloan", data, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(result => {
        this.props.history.push("/load");
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        alert("load id already exist");
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="loanid" bsSize="large">
            <ControlLabel>LoanId</ControlLabel>
            <FormControl
              autoFocus
              type="loanid"
              value={this.state.loanid}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              value={this.state.name}
              onChange={this.handleChange}
              type="name"
            />
          </FormGroup>
          {/* <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              value={this.state.email}
              onChange={this.handleChange}
              type="ssnumber"
            />
          </FormGroup> */}
          <FormGroup controlId="ramounnt" bsSize="large">
            <ControlLabel>Request Amount</ControlLabel>
            <FormControl
              value={this.state.ramounnt}
              onChange={this.handleChange}
              type="ramounnt"
            />
          </FormGroup>
          <FormGroup controlId="ssnumber" bsSize="large">
            <ControlLabel>SSN</ControlLabel>
            <FormControl
              value={this.state.ssnumber}
              onChange={this.handleChange}
              type="ssnumber"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Request Loan"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}

export default Login;
