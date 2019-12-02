import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from "axios";
import "./Login.css";
class GetUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadList: [],
      username: "",
      isLoading: false,
      data: []
    };
  }

  validateForm() {
    return this.state.username.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleGetTwitte = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { username } = this.state;
    axios
      .get("http://130.245.168.66/user/" + username, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(result => {
        // alert(result.item);
        alert("get user");
        console.log("xxxxx", result.data.user);
        this.setState({ isLoading: false });
        this.setState({ data: result.data.user });
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        this.setState({ isLoading: false });
      });
  };
  render() {
    const { data } = this.state;
    return (
      <div className="Login">
        <form onSubmit={this.handleGetTwitte}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Get User info "
            loadingText="Getting the user info…"
          />
        </form>
        <div>
          {this.state.data != [] ? (
            <ul>
              <li>email: {data["email"]}</li>
              <li>followers: {data["followers"]}</li>
              <li>following: {data["following"]}</li>
            </ul>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

export default GetUser;
