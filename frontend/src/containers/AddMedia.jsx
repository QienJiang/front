import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from "axios";
import Select from "react-select";
import "./Login.css";

class AddMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadList: [],
      isLoading: false,
      data: "",
      media: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handlePostTwitte = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    const { media } = this.state;
    let data = JSON.stringify({
      media: media
    });

    axios
      .post("http://130.245.168.66/addmedia", data, {
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
        alert("add media fail");
        this.setState({ isLoading: false });
      });
  };
  onChangeHandler = event => {
    this.setState({
      media: event.target.files
    });
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handlePostTwitte}>
          <ControlLabel>Add Media</ControlLabel>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={this.onChangeHandler}
          />
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validatecontent()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Add Media"
            loadingText="Adding media…"
          />
        </form>
        <div style={{ float: "right" }}>
          {this.state.data != "" ? <p>Id: {this.state.data}</p> : <div />}
        </div>
      </div>
    );
  }
}

export default AddMedia;
