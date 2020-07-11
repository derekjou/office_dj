import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NavBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let loggedUser = sessionStorage.getItem("loggedUser");

  useEffect(() => {
    if (loggedUser) {
      dispatch({ type: "login", user: JSON.parse(loggedUser) });
    }
  }, []);

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    dispatch({ type: "logout" });
    history.push("/");
  };

  const renderUserOptions = () => {
    return (
      <>
        <NavDropdown title="User Actions">
          <NavDropdown.Item href="/userRooms">Rooms</NavDropdown.Item>
          <NavDropdown.Item href="/requestSong">
            Request a Song
          </NavDropdown.Item>
          <NavDropdown.Item href="/updateUser">Update Account</NavDropdown.Item>
        </NavDropdown>
      </>
    );
  };

  const renderDJOptions = () => {
    return (
      <>
        <NavDropdown title="DJ Actions">
          <NavDropdown.Item href="/djRooms">My Rooms</NavDropdown.Item>
          <NavDropdown.Item href="/createRoom">Create a Room</NavDropdown.Item>
        </NavDropdown>
      </>
    );
  };

  const renderBaseOptions = () => {
    return (
      <>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/registerUser">Register</Nav.Link>
      </>
    );
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">OFFICE DJ</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {loggedUser ? (
            JSON.parse(loggedUser).role === "user" ? (
              <>{renderUserOptions()}</>
            ) : JSON.parse(loggedUser).role === "DJ" ? (
              <>
                {renderUserOptions()}
                {renderDJOptions()}
              </>
            ) : <Nav.Link href="/admin">Dashboard</Nav.Link>
            ) : (
              <>{renderBaseOptions()}</>
            )}
        </Nav>
        {loggedUser ? (
          <Form inline>
            <Button variant="danger" type="submit" onClick={(e) => logout(e)}>
              Logout
            </Button>
          </Form>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
