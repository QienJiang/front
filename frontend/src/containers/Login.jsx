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
      email: "",
      password: "",
      username: ""
    };
  }
  // async componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState.isLoading);
  //   console.log(prevProps.userHasAuthenticated);
  // }
  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { email, password, username } = this.state;
    let data = JSON.stringify({
      email: email,
      password: password,
      username: username
    });
    axios.defaults.withCredentials = true;
    axios
      .post("http://130.245.169.40/login", data, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
        // withCredentials: true
      })
      .then(result => {
        this.props.userHasAuthenticated(true);
        //console.log("user", result.session.username);

        if (result.status == 200) {
          alert("login");
          this.props.history.push("/gettwitter");
        } else {
          alert("error");
        }
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        alert("invalid user name or password");
        this.setState({ isLoading: false });
      });

    await this.props.saveEmail(this.state.email);
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
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
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}

export default Login;
