import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./userPhotos.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
      photosOfThisUser:[],
    }
  }

  // TODO: since we can't re-render this component with different props 
  // (while in userDetail, we can do that by clicking different user in the userList)
  // we just use componentDidMount instead of componentDidUpdate here.
  // update:here we should just use componentDidMount, because componentDidUpdate
  // won't be called for the first render!!!!
  componentDidMount(){
    console.log('componentDidMount in UserPhotos is called');
    fetchModel(`http://localhost:3000/user/${this.props.match.params.userId}`).then(
      result => this.setState({
        user:JSON.parse(result)
      })
    );
    fetchModel(`http://localhost:3000/photosOfUser/${this.props.match.params.userId}`).then(
      result => this.setState({
        photosOfThisUser:JSON.parse(result)
      })
    )
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate in UserPhotos is called');
    let appContext = `Photos of ${this.state.user.first_name} ${this.state.user.last_name}`;
    if (prevProps.appContext !== appContext) {
      this.props.setAppContext(appContext);
    }
  }

  render() {
    let photos =
      this.state.photosOfThisUser &&
      this.state.photosOfThisUser.map((photo) => {
        let comments =
          photo["comments"] &&
          photo["comments"].map((comment) => {
            let commentUser = comment["user"];
            return (
              <div key={comment["_id"]}>
                <Typography variant="body1">
                  <Link to={`/users/${commentUser["_id"]}`}>
                    {`${commentUser["first_name"]} ${commentUser["last_name"]} `}
                  </Link>
                  {comment["date_time"]}
                </Typography>
                <Typography variant="body1">{comment["comment"]}</Typography>
              </div>
            );
          });
        return (
          <div key={photo["_id"]}>
            <Typography variant="body1">
              Created at {photo["date_time"]}
            </Typography>
            <img src={`/images/${photo["file_name"]}`}></img>
            {
              photo["comments"] !== undefined && photo["comments"].length > 0 ? (
                <Typography variant="body1">comments:</Typography>
              ) : undefined
            }
            {comments}
          </div>
        );
      });
    return <div>{photos}</div>;
  }
}

export default UserPhotos;
