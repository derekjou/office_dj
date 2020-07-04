import React, { Component } from "react";
import { Route, BrowserRouter as Router, Link, Redirect } from "react-router-dom";

import Home from '../Home/Home';
import UpdateUser from '../UpdateUser/UpdateUser';
import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import RegisterUser from '../RegisterUser/RegisterUser';
import Admin from '../Admin/Admin';
import AddMusic from '../AddMusic/AddMusic';
import Player from '../Player/Player';

const checkLogin = () => {
  return sessionStorage.getItem('loggedUser') ? true : false;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkLogin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
  />
);

class Routing extends Component {
  render() {
    return (
      <Router>
        <NavBar></NavBar>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registerUser" component={RegisterUser} />
        <PrivateRoute path='/updateUser' component={UpdateUser} />
        <Route path="/admin" component={Admin} />
        <Route path="/addMusic" component={AddMusic} />
        <Route path="/player" component={Player} />
      </Router>
    );
  }
}

export default Routing;
