import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./userDetail.css";

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let user = window.cs142models.userModel(this.props.match.params.userId);
    let name = `${user.first_name} ${user.last_name}`;
    this.props.setAppContext(name);
  }
  componentDidUpdate(prevProps) {
    let user = window.cs142models.userModel(this.props.match.params.userId);
    let name = `${user.first_name} ${user.last_name}`;
    if (prevProps.appContext !== name) {
      this.props.setAppContext(name);
    }
  }

  render() {
    let user = window.cs142models.userModel(this.props.match.params.userId);
    let photosOfThisUser = window.cs142models.photoOfUserModel(user._id);
    console.log(this.props.location.pathname);
    return (
      <div>
        <Typography variant="body1">
          {`[${user.occupation}] ${user.first_name} ${user.last_name} (id:${user._id})`}
          🌞
        </Typography>

        <Typography variant="body1">Located in {user.location} 🚗</Typography>

        <Typography variant="body1">Description: {user.description}</Typography>
        <Link to={`/photos/${user._id}`}>Photos</Link>
      </div>
    );
  }
}

export default UserDetail;
