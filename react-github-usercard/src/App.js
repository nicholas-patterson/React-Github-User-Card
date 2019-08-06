import React from "react";
import axios from "axios";

import GithubCard from "./Components/GithubCard";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      followers: [],
      currentUsername: "nicholas-patterson",
      updatedUsername: ""
    };
  }

  fetchGithubData = () => {
    axios
      .get(`https://api.github.com/users/${this.state.currentUsername}`)
      .then(res => this.setState({ userData: res.data }))
      .catch(err => console.log(err));
  };

  fetchFollowersData = () => {
    axios
      .get(
        `https://api.github.com/users/${this.state.currentUsername}/followers`
      )
      .then(res => this.setState({ followers: res.data }))
      .catch(err => console.log(err));
  };

  componentDidMount = () => {
    this.fetchGithubData();
    this.fetchFollowersData();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      currentUsername: this.state.updatedUsername
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.currentUsername !== this.state.currentUsername) {
      this.fetchGithubData();
      this.fetchFollowersData();
    }
  };

  updatedUsername = e => {
    this.setState({
      updatedUsername: e.target.value
    });
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
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.updatedUsername}
              value={this.state.updatedUsername}
              name="updatedUsername"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
