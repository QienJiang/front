import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from "axios";
import "./Login.css";

class LikeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadList: [],
      username: "",
      isLoading: false,
      data: []
    };
  }

  validateForm() {}
  validatecontent() {}
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handlePostTwitte = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { username } = this.state;

    axios
      .get("http://130.245.168.66/user/" + username + "/posts", {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then((result) => {
        console.log("results", result.data.items);
        this.setState({ data: result.data.items });
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        console.log("fail");
        alert("invalid childType");
        this.setState({ isLoading: false });
      });
  };

  displayResult() {
    const { data } = this.state;
    let i = 1;
    const listItems = data.map((number) => (
      <ul>
        <li key={i.toString()}>
          id {i++} : {number}
        </li>
      </ul>
    ));
    return <ul>{listItems}</ul>;
  }

  render() {
    const { data } = this.state;
    return (
      <div className="Login">
        <form onSubmit={this.handlePostTwitte}>
          <FormGroup controlId="username">
            <ControlLabel>username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />{" "}
          </FormGroup>

          <LoaderButton
            block
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Search"
            loadingText="Searching ..."
          />
        </form>
        <div style={{ float: "right" }}>
          <div>
            {this.state.data.length > 0 ? this.displayResult() : <div />}
          </div>
        </div>
      </div>
    );
  }
}

export default LikeUser;
