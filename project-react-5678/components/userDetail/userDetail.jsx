import React from "react";
import { Typography, Link as LinkUI } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import "./userDetail.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    console.log("componentDidMount in UserDetail is called");
    fetchModel(`http://localhost:3000/user/${this.props.match.params.userId}`)
      .then((result) => {
        let user = result["data"];
        this.setState({
          user: user,
        });
        let name = `${user.first_name} ${user.last_name}`;
        this.props.setAppContext(name);
      })
      .catch(alert);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      console.log("componentDidUpdate in UserDetail is called");
      fetchModel(`http://localhost:3000/user/${this.props.match.params.userId}`)
        .then((result) => {
          let user = result["data"];
          this.setState({
            user: user,
          });
          let name = `${user.first_name} ${user.last_name}`;
          if (prevProps.appContext !== name) {
            this.props.setAppContext(name);
          }
        })
        .catch(alert);
    }
  }

  render() {
    let user = this.state.user;
    return (
      <div>
        <Typography variant="h1">
          {`${user.first_name} ${user.last_name}`}
        </Typography>

        <Typography variant="h4">
          {`${user.occupation}`} , Located in {user.location}
        </Typography>

        <Typography variant="h6">Description:</Typography>
        <Typography variant="body1">{user.description}</Typography>
        <LinkUI
          component={RouterLink}
          to={`/photos/${user._id}`}
          color="primary"
          variant="h6"
        >
          Photos
        </LinkUI>
      </div>
    );
  }
}

export default UserDetail;
