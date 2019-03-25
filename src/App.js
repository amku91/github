import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import UserProfile from './components/user_profile/UserProfile';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
/**Include env files */
require('dotenv').config();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "Guest",
      avatar_url: "",
      name: "",
      userData: {}
    };
  }
  componentDidMount() {
    let userDataUrl = process.env.REACT_APP_GITHUB_URL + "users/" + process.env.REACT_APP_GITHUB_USER;
    fetch(userDataUrl)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            username: data.login,
            avatar_url: data.avatar_url,
            name: data.name,
            userData: data
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  render() {
    return (
      <Router>
        <Navbar username={this.state.username} avatar_url={this.state.avatar_url} />
        <UserProfile userData={this.state.userData} />
      </Router>
    );

  }
}

export default App;



// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>
// );