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

  let loggedUser = sessionStorage.getItem('loggedUser');
  // let isDJ = false;

  useEffect(() => {
    if(loggedUser){
      dispatch({ type: 'login', user: JSON.parse(loggedUser) })
    }

    // if (loggedUser && loggedUser.role === 'DJ') {
    //   dispatch({ type: 'checkRole', role: 'DJ', isDJ: true });
    // }
  });

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.clear()
    dispatch({ type: "logout" })
    history.push('/');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">OFFICE DJ</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {/* {state.isDJ ? (
            <>
              <Nav.Link href="/room/">My Rooms</Nav.Link>
              <Nav.Link href="/createroom">Create a Room</Nav.Link>
            </>
          ) : null} */}
          {loggedUser ? (
            <>
              <Nav.Link href="/room">My Rooms</Nav.Link>
              <Nav.Link href="/createroom">Create a Room</Nav.Link>
              <Nav.Link href="/updateUser">Update User</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/registerUser">Register</Nav.Link>
            </>
          )}
        </Nav>
        {loggedUser ? (
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
