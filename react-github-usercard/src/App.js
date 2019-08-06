import React from "react";
import axios from "axios";

import GithubCard from "./Components/GithubCard";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

//import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200
//   }
// }));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      followers: [],
      currentUsername: "",
      updatedUsername: ""
    };
  }

  fetchGithubData = () => {
    axios
      .get("https://api.github.com/users/nicholas-patterson")
      .then(res => this.setState({ userData: res.data }))
      .catch(err => console.log(err));
  };

  fetchFollowersData = () => {
    axios
      .get("https://api.github.com/users/nicholas-patterson/followers")
      .then(res => this.setState({ followers: res.data }))
      .catch(err => console.log(err));
  };

  componentDidMount = () => {
    this.fetchGithubData();
    this.fetchFollowersData();
  };

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="primary">
              React Github User Card
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <GithubCard
            userData={this.state.userData}
            followers={this.state.followers}
          />
        </div>
      </div>
    );
  }
}

export default App;
