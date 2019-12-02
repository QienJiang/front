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
import Select from "react-select";

const options = [
  { value: "time", label: "Time" },
  { value: "interest", label: "Interest" }
];

class PostSearchA extends Component {
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
      data: [],

      rank: options[1],
      parent: "",
      replies: true,
      hasMedia: false
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
  handleReply = event => {
    console.log("value", this.state.replies);
    this.setState({
      replies: event.target.checked
    });
    console.log("value change to", this.state.replies);
  };

  handleMedia = event => {
    console.log("value", this.state.hasMedia);
    this.setState({
      hasMedia: event.target.checked
    });
    console.log("value change to", this.state.hasMedia);
  };

  handlePostTwitte = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const {
      timestamp,
      limit,
      q,
      username,
      following,
      rank,
      replies,
      parent,
      hasMedia
    } = this.state;
    let data = JSON.stringify({
      timestamp: timestamp,
      limit: limit,
      q: q,
      username: username,
      following: following,
      rank: rank.value,
      parent: parent,
      replies: replies,
      hasMedia: hasMedia
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

  handleChangeOption = rank => {
    this.setState({ rank }, () =>
      console.log(`Option selected:`, this.state.rank)
    );
  };

  render() {
    const { following, replies, rank, hasMedia } = this.state;
    console.log("render", following);
    console.log("render replies", replies);
    console.log("render rank", rank);
    console.log("render hasMedia", hasMedia);

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

          <div>
            <ControlLabel>rank</ControlLabel>
            <Select
              defaults="time"
              value={this.state.rank}
              onChange={this.handleChangeOption}
              options={options}
            />
          </div>
          <FormGroup controlId="parent">
            <ControlLabel>parent</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.parent}
              onChange={this.handleChange}
            />{" "}
          </FormGroup>
          <div>
            <label>
              replies
              <Checkbox
                name="replies"
                checked={this.state.replies}
                onChange={this.handleReply}
              ></Checkbox>
            </label>
          </div>

          <div>
            <label>
              hasMedia
              <Checkbox
                name=" hasMedia"
                checked={this.state.hasMedia}
                onChange={this.handleMedia}
              ></Checkbox>
            </label>
          </div>
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

export default PostSearchA;
