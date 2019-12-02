import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from "axios";
import "./Login.css";

class LikeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadList: [],
      id: "",
      like: true,
      isLoading: false,
      data: []
    };
  }

  validateForm() {}
  validatecontent() {}
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handlePostTwitte = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { id, like } = this.state;
    let data = JSON.stringify({
      id: id,
      like: like
    });
    axios
      .post("http://130.245.168.66/item/" + id + "/like", data, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(result => {
        console.log("like sucess");
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        console.log("fail");
        alert("already like this item or item does not exist");
        this.setState({ isLoading: false });
      });
  };

  displayResult() {
    const { data } = this.state;
    let i = 1;
    const listItems = data.map(number => (
      <ul>
        <li key={i.toString()}>
          id {i++} : {number}
        </li>
      </ul>
    ));
    return <ul>{listItems}</ul>;
  }
  handleLike = event => {
    console.log("value", this.state.like);
    this.setState({
      like: event.target.checked
    });
    console.log("value change to", this.state.like);
  };
  render() {
    const { data } = this.state;
    return (
      <div className="Login">
        <form onSubmit={this.handlePostTwitte}>
          <FormGroup controlId="id">
            <ControlLabel>id</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.id}
              onChange={this.handleChange}
            />{" "}
          </FormGroup>
          <label>
            like
            <Checkbox
              name="like"
              checked={this.state.like}
              onChange={this.handleLike}
            ></Checkbox>
          </label>
          <LoaderButton
            block
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="like"
            loadingText="like ..."
          />
        </form>
      </div>
    );
  }
}

export default LikeUser;
