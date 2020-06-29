import React, { Component } from "react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron';


class Home extends Component {
  render() {
    return (
      <Jumbotron>
        <h1>Welcome to Office DJ</h1>
        <p>Check us out pls</p>
      </Jumbotron>
    );
  }
}

export default Home;
