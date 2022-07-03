import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import "./userList.css";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let users = window.cs142models.userListModel();
    let UserItems = users.map((user) => {
      let name =`${user.first_name} ${user.last_name}`;
      return (
        <div key={name}>
          <ListItem>
            <NavLink to= {`/users/${user._id}`} >{name}</NavLink>
          </ListItem>
          <Divider />
         </div>
      );
    });
    return (
      <div>
        <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. 
        </Typography>
        <List component="nav">
          {UserItems}
        </List>
      </div>
    );
  }
}

export default UserList;
