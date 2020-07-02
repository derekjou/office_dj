import React, { Component } from "react";
import { Route, BrowserRouter as Router, Link, Redirect } from "react-router-dom";

import Home from '../Home/Home';
import UpdateUser from '../UpdateUser/UpdateUser';
import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import CreateRoom from '../CreateRoom/CreateRoom';
import Room from '../Room/Room';
import RegisterUser from '../RegisterUser/RegisterUser';

const checkLogin = () => {
  // return sessionStorage.getItem('user') ? true : false;
  return true;
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
        <Route path="/RegisterUser" component={RegisterUser} />
        <PrivateRoute path='/updateUser' component={UpdateUser} />
        <Route exact path="/createroom" component={CreateRoom} />
        <Route exact path="/myroom" component={Room} />
      </Router>
    );
  }
}

export default Routing;
