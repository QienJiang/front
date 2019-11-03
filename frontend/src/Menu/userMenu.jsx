import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

class UserMenu extends Component {
  render() {
    return (
      <div sytle={{ maxWidth: 100 }}>
        <List>
          <ListItem button onClick={() => this.props.history.push("/load")}>
            <ListItemText primary="Load Table" />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Request load"
              onClick={() => this.props.history.push("/requestloan")}
            />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default UserMenu;
