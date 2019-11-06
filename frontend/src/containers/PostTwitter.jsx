import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from "axios";
import "./Login.css";

class PostTwitter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadList: [],
      twitterId: "",
      content: "",
      childType: "",
      isLoading: false,
      data: ""
    };
  }

  validateForm() {
    return this.state.twitterId.length > 0;
  }
  validatecontent() {
    return this.state.content.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handlePostTwitte = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { content, childType } = this.state;
    let data = JSON.stringify({
      content: content,
      childType: childType
    });

    axios
      .post("http://130.245.169.40/additem", data, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(result => {
        console.log(result.data);
        this.setState({ data: result.data.id });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        alert("invalid childType");
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handlePostTwitte}>
          <FormGroup controlId="content">
            <ControlLabel>Post Your Twitte</ControlLabel>
            <FormControl
              as="textarea"
              rows="10"
              autoFocus
              value={this.state.content}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="childType">
            <ControlLabel>childType</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.childType}
              onChange={this.handleChange}
            />{" "}
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validatecontent()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Twitter"
            loadingText="posting the twitte…"
          />
        </form>
        <div style={{ float: "right" }}>
          {this.state.data != "" ? <p>Id: {this.state.data}</p> : <div />}
        </div>
      </div>
    );
  }
}

export default PostTwitter;
