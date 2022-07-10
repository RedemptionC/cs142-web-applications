import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
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
        <Typography variant="body1">
          {`[${user.occupation}] ${user.first_name} ${user.last_name}`}
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
