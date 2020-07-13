import React, { Component } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";

import Home from '../Home/Home';
import UpdateUser from '../UpdateUser/UpdateUser';
import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import CreateRoom from '../CreateRoom/CreateRoom';
import Room from '../Room/Room';
import UserRooms from '../Rooms/UserRooms';
import DJRooms from '../Rooms/DJRooms';
import WorkRequest from '../JoinRoom/WorkRequest';
import RegisterUser from '../RegisterUser/RegisterUser';
import Admin from '../Admin/Admin';
import AddMusic from '../AddMusic/AddMusic';
import ChangeUserRole from '../ChangeUserRole/ChangeUserRole';
import RequestNewSong from "../RequestNewSong/RequestNewSong";
import RequestNewSongToPlaylist from "../RequestSongToPlaylist/RequestSongToPlaylist";
import DJApproveSongRequests from "../DJApproveSongRequests/DJApproveSongRequests";
import AdminApproveNewSong from "../AdminApproveNewSong/AdminApproveNewSong";

const checkLogin = () => {
  let role = JSON.parse(sessionStorage.getItem('loggedUser')).role
  return role === 'DJ' || role === 'user';
}

const checkDJ = () => {
  return JSON.parse(sessionStorage.getItem('loggedUser')).role === 'DJ';
}

const checkAdmin = () => {
  return JSON.parse(sessionStorage.getItem('loggedUser')).role === 'admin';
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

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAdmin() ? (
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
        <NavBar />
        <Route exact path="/">
          <Home user={JSON.parse(sessionStorage.getItem('loggedUser'))}/>
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterUser} />
        <PrivateRoute path='/updateUser' component={UpdateUser} />
        <PrivateRoute path="/requestSong" component={RequestNewSong} />
        <PrivateRoute path="/userRooms" component={UserRooms} />
        <PrivateRoute path="/room/:id" component={Room} />
        <DJRoute path="/djRooms" component={DJRooms} />
        <DJRoute path="/createRoom" component={CreateRoom} />
        <DJRoute path="/joinrequests/:roomid" component={WorkRequest} /> 
        <AdminRoute path="/admin" component={Admin} />
        <AdminRoute path="/addMusic" component={AddMusic} />
        <AdminRoute path="/changeRole" component={ChangeUserRole} />
        <AdminRoute path="/approveNewSong" component={AdminApproveNewSong} />

        <Route path="/requestSongToPlaylist" component={RequestNewSongToPlaylist} />
        <Route path="/songRequests" component={DJApproveSongRequests} />
        <div style={{ textAlign: 'center', color: '#BBB', fontSize:"0.8rem", margin: "40px 0 10px"}}>Created by Timothy, Victoria, Felix, and Derek</div>
      </Router>
    );
  }
}


export default Routing;
