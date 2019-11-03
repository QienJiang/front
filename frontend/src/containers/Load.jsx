import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

import axios from "axios";
class Load extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadList: [],
      twitterId: "",
      content: "",
      childType: "",
      isLoading: false
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

  handleGetTwitte = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { twitterId } = this.state;
    axios
      .get("http://130.245.169.40/item" + twitterId, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(result => {
        alert(result.item);
        alert("get item");
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        alert("invalid user name or password");
        this.setState({ isLoading: false });
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
        alert(result);
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        alert("invalid user name or password");
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleGetTwitte}>
          <FormGroup controlId="twitterId" bsSize="large">
            <ControlLabel>Get your twitter</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.twitterId}
              onChange={this.handleChange}
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Get twitter "
            loadingText="Getting the twitter…"
          />
        </form>

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
          <ControlLabel>childType</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.childType}
            onChange={this.handleChange}
          />
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
      </div>
    );
  }

  reload() {
    // console.log("loading");
    // let data = JSON.stringify({
    //   email: this.props.state.email
    // });
    // console.log("data", data);
    // axios
    //   .post("http://localhost:8080/loan/myloan", data, {
    //     headers: { "Content-Type": "application/json;charset=UTF-8" }
    //   })
    //   .then(result => {
    //     console.log(result.data);
    //     this.setState({ loadList: result.data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     console.log("fail");
    //   });
  }

  componentDidMount() {
    this.reload();
  }
}

export default Load;
