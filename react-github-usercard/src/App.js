import React from "react";
import axios from "axios";
import GithubCard from "./Components/GithubCard";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {}
    };
  }

  fetchGithubData = () => {
    axios
      .get("https://api.github.com/users/nicholas-patterson")
      .then(res => this.setState({ userData: res.data }));
  };

  componentDidMount = () => {
    this.fetchGithubData();
  };

  render() {
    console.log(this.state.userData);
    return (
      <div>
        <GithubCard userData={this.state.userData} />
      </div>
    );
  }
}

export default App;
