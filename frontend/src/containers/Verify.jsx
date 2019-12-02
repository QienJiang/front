import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from "axios";

class Verify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      key: ""
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  validateForm() {
    return this.state.email.length > 0 && this.state.key.length > 0;
  }
  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { email, key } = this.state;
    let data = JSON.stringify({
      email: email,
      key: key
    });

    axios
      .post("http://130.245.168.66/verify", data, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(result => {
        console.log("status:", result.status);
        this.setState({ isLoading: false });
        if (result.status == "error") {
          alert("Failed Verify");
        } else if (result.status == 200 || result.status == "OK") {
          alert("login");
          this.props.history.push("/login");
        }
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        alert("invalid email or key");
        this.setState({ isLoading: false });
      });

    await this.props.saveEmail(this.state.email);
  };
  render() {
    return (
      <div className="Verify">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="key" bsSize="large">
            <ControlLabel>Key</ControlLabel>
            <FormControl
              value={this.state.key}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Verify"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}

export default Verify;
