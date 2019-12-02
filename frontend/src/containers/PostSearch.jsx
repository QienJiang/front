import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  Button
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from "axios";
import "./Login.css";

class PostSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadList: [],
      timestamp: "",
      limit: "",
      q: "",
      username: "",
      following: true,
      isLoading: false,
      data: []
    };
  }

  validateForm() {}
  validatecontent() {}
  handleChange = event => {
    console.log("value", event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleFollowing = event => {
    console.log("value", this.state.following);

    this.setState({
      following: event.target.checked
    });

    console.log("value change to", this.state.following);
  };
  handlePostTwitte = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { timestamp, limit, q, username, following } = this.state;
    let data = JSON.stringify({
      timestamp: timestamp,
      limit: limit,
      q: q,
      username: username,
      following: following
    });
    axios.defaults.withCredentials = true;
    axios
      .post("http://130.245.168.66/search", data, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(result => {
        console.log("results", result.data.items);
        this.setState({ data: result.data.items });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        alert("invalid childType");
        this.setState({ isLoading: false });
      });
  };

  displayResult() {
    const { data } = this.state;
    let i = 1;
    const listItems = data.map(number => (
      <ul>
        <li key={i.toString()}>{i++}</li>
        <li>id: {number["id"]}</li>
        <li>username: {number["username"]}</li>
        <li>retweeted: {number["retweeted"]}</li>
        <li>content: {number["content"]}</li>
        <li>timestamp: {number["timestamp"]}</li>
      </ul>
    ));
    return <ul>{listItems}</ul>;
  }

  render() {
    const { following } = this.state;
    console.log("render", following);
    return (
      <div className="Login">
        <form onSubmit={this.handlePostTwitte}>
          <FormGroup controlId="timestamp">
            <ControlLabel>Timestamp</ControlLabel>
            <FormControl
              as="textarea"
              rows="10"
              autoFocus
              value={this.state.timestamp}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="limit">
            <ControlLabel>limit</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.limit}
              onChange={this.handleChange}
            />{" "}
          </FormGroup>
          <FormGroup controlId="q">
            <ControlLabel>q</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.q}
              onChange={this.handleChange}
            />{" "}
          </FormGroup>
          <FormGroup controlId="username">
            <ControlLabel>username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />{" "}
          </FormGroup>
          <label>
            following
            <Checkbox
              name="following"
              checked={this.state.following}
              onChange={this.handleFollowing}
            ></Checkbox>
          </label>

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

export default PostSearch;
