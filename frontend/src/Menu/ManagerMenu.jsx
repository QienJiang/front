import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

class ManagerMenu extends Component {
  render() {
    return (
      <div sytle={{ maxWidth: 100 }}>
        <List>
          <ListItem button onClick={() => this.props.history.push("/manager")}>
            <ListItemText primary="Manage Loan" />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Request load"
              onClick={() => this.props.history.push("/requestloan")}
            />
          </ListItem>
          <ListItem button onClick={() => this.props.history.push("/load")}>
            <ListItemText primary="Load Table" />
          </ListItem>
          <ListItem button onClick={() => this.props.history.push("/chart")}>
            <ListItemText primary="Status Chart" />
          </ListItem>
          <ListItem
            button
            onClick={() => this.props.history.push("/gettwitter")}
          >
            <ListItemText primary="Get Twitter" />
          </ListItem>
          <ListItem
            button
            onClick={() => this.props.history.push("/posttwitter")}
          >
            <ListItemText primary="Post Twitter" />
          </ListItem>
          <ListItem
            button
            onClick={() => this.props.history.push("/deletetwitter")}
          >
            <ListItemText primary="Delete Twitter" />
          </ListItem>
          <ListItem button onClick={() => this.props.history.push("/follow")}>
            <ListItemText primary="Follow a user" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default ManagerMenu;
