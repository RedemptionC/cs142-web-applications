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
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
    }
  }

  componentDidMount(){
    console.log('componentDidMount in userList is called');
    fetchModel('http://localhost:3000/user/list').then(
      result => this.setState({
        users:JSON.parse(result)
      })
    )
  }

  render() {
    let UserItems = this.state.users.map((user) => {
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
          User list.
        </Typography>
        <List component="nav">
          {UserItems}
        </List>
      </div>
    );
  }
}

export default UserList;
