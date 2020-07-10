import React, { Component } from "react";
import { Route, BrowserRouter as Router, Link, Redirect } from "react-router-dom";

import Home from '../Home/Home';
import UpdateUser from '../UpdateUser/UpdateUser';
import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import CreateRoom from '../CreateRoom/CreateRoom';
import Room from '../Room/Room';
import WorkRequest from '../JoinRoom/WorkRequest';
import RegisterUser from '../RegisterUser/RegisterUser';
import Admin from '../Admin/Admin';
import AddMusic from '../AddMusic/AddMusic';
import ChangeUserRole from '../ChangeUserRole/ChangeUserRole';
import RequestNewSong from "../requestNewSong/RequestNewSong";

const checkLogin = () => {
  return sessionStorage.getItem('loggedUser') ? true : false;
}

const getLoggedRole = () => {
  return sessionStorage.getItem('loggedUser').role
}

const checkDJ = () => {
  const loggedRole = sessionStorage.getItem('loggedUser').role
  return loggedRole && loggedRole == 'DJ';
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

const DJRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkDJ() ? (
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
        <Route exact path="/createroom" component={CreateRoom} />
        <Route exact path="/myroom" component={Room} />
        <Route path="/joinrequests/:roomid" component={WorkRequest} />
        <Route path="/admin" component={Admin} />
        <Route path="/addMusic" component={AddMusic} />
        <Route path="/changeRole" component={ChangeUserRole} />
        <Route path="/requestSong" component={RequestNewSong} />
      </Router>
    );
  }
}

export default Routing;
