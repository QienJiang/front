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
      itemID: "",
      content: "",
      childType: "",
      isLoading: false,
      data: []
    };
  }

  validateForm() {
    return this.state.itemID.length > 0;
  }
  validatecontent() {
    return this.state.content.length > 0;
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleGetTwitte = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { itemID } = this.state;
    axios
      .get("http://130.245.169.40/item/" + itemID, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then((result) => {
        // alert(result.item);
        alert("get item");
        console.log("xxxxx", result.data.item);
        this.setState({ isLoading: false });
        this.setState({ data: result.data.item });
      })
      .catch((error) => {
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
          <FormGroup controlId="itemID" bsSize="large">
            <ControlLabel>Get your twitter</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.itemID}
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
        <div>
          {this.state.data["id"] && this.state.data["id"].length > 0 ? (
            <ul>
              <li>id: {data["id"]}</li>
              <li>username: {data["username"]}</li>
              <li>retweeted: {data["retweeted"]}</li>
              <li>content: {data["content"]}</li>
              <li>timestamp: {data["timestamp"]}</li>
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
