import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserService from "../../services/user.service";

const NavBar = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const userService = new UserService();

  const loggedIn = false;
  const isDJ = false;
  useEffect(() => {
    if(sessionStorage.getItem('loggedUser')){
      loggedIn = true;
    }

    let loggedUser = sessionStorage.getItem('loggedUser')
    if (loggedUser && loggedUser.role == 'DJ') {
      isDJ = true;
    }
  });

  const logout = (e) => {
    e.preventDefault();
    // this.userService.logout()
    dispatch({ type: "logout" })
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">OFFICE DJ</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {isDJ ? (
            <>
              <Nav.Link href="/room/">My Rooms</Nav.Link>
              <Nav.Link href="/createroom">Create a Room</Nav.Link>
            </>
          ) : null}
          {loggedIn ? (
            <>
              <Nav.Link href="/room">My Rooms</Nav.Link>
              <Nav.Link href="/createroom">Create a Room</Nav.Link>
              <Nav.Link href="/updateUser">Update User</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
        {loggedIn ? (
          <Form inline>
            <Button variant="danger" type="submit" onClick={e => logout(e)}>
              Logout
            </Button>
          </Form>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
