import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from "axios";
import "./Login.css";
class GetMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadList: [],
      id: "",
      username: "",
      media: null,
      isUse: "",
      isLoading: false,
      data: []
    };
  }

  validateForm() {
    return this.state.id.length > 0;
  }
  /*
  validatecontent() {
    return this.state.content.length > 0;
  }*/
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleGetTwitte = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { id } = this.state;
    axios
      .get("http://130.245.168.66/media/" + id, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(result => {
        alert("get media");
        console.log("xxxxx", result.data.media);
        this.setState({ isLoading: false });
        this.setState({ data: result.data.media });
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        this.setState({ isLoading: false });
      });
  };
  render() {
    const { data } = this.state;
    console.log("length", this.state.data.length);
    return (
      <div className="Login">
        <form onSubmit={this.handleGetTwitte}>
          <FormGroup controlId="id" bsSize="large">
            <ControlLabel>Get Media</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.id}
              onChange={this.handleChange}
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Get Media"
            loadingText="Getting the Media…"
          />
        </form>
        <div>
          {this.state.data != [] ? (
            <ul>
              <li>media: {this.state.data["username"]}</li>
            </ul>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

export default GetMedia;
