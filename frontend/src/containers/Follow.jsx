import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from "axios";
import "./Login.css";
class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadList: [],
      username: "",
      follow: true,
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
    const { username, follow } = this.state;

    let data = JSON.stringify({
      username: username,
      follow: follow
    });
    axios
      .post("http://130.245.169.40/follow", data, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(result => {
        // alert(result.item);
        alert("follow user");
        console.log("xxxxx", result);
        this.setState({ isLoading: false });
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
            text="Follow user"
            loadingText="Following the user ..."
          />
        </form>
      </div>
    );
  }
}

export default Follow;
