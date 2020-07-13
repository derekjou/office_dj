import React from "react";
import { useSelector } from "react-redux";
import "./Home.scss";
import Jumbotron from "react-bootstrap/Jumbotron";
import notLoggedLogo from "../../images/notLogged.png";
import djLogo from "../../images/dj.png";
import userLogo from "../../images/user.png";
import adminLogo from "../../images/admin.png"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = (props) => {
  const state = useSelector((state) => state);

  const renderNotLogged = () => {
    return (
      <Container>
        <Row>
          <Col>
            <img alt="homeImage" src={notLoggedLogo} />
          </Col>
          <Col>
            <h1>
              Welcome to <span className="pop">Office DJ</span>!
            </h1>
            <p>Choose the music you listen to with your work buddies!</p>
            <p>
              <a href="/login">Login</a> or <a href="/register">Register</a> to
              get started!
            </p>
          </Col>
        </Row>
      </Container>
    );
  };
  const renderUser = () => {
    return (
      <Container>
        <Row>
          <Col xs={{ span: 5, offset: 1}}>
            <img className="small" alt="homeImage" src={userLogo} />
          </Col>
          <Col>
            <h1>Welcome, {state.user.username}!</h1>
            <p>Start listening by <a href="/userRooms">joining a room!</a></p>
            <p>
              If you're already in a room,{" "}
              <a href="/userRooms">start listening</a>!
            </p>
          </Col>
        </Row>
      </Container>
    );
  };

  const renderDJ = () => {
    return (
      <Container>
        <Row>
          <Col>
            <img alt="homeImage" src={djLogo} />
          </Col>
          <Col>
            <h1>Welcome, DJ {state.user.username}!</h1>
            <p>
              Start listening by joining a room or{" "}
              <a href="/createRoom">create your own</a>!
            </p>
            <p>
              If you're already in a room,{" "}
              <a href="/userRooms">start listening</a>!
            </p>
          </Col>
        </Row>
      </Container>
    );
  };

  const renderAdmin = () => {
    return (
      <Container>
      <Row>
        <Col xs={{ span: 5, offset: 1}}>
          <img alt="homeImage" src={adminLogo} />
        </Col>
        <Col>
          <h1>Welcome, Admin!</h1>
          <p>Start controlling the users from your <a href="/admin">ivory tower</a>!</p>
        </Col>
      </Row>
    </Container>
    );
  };

  return (
    <Jumbotron>
      <div className="displayContainer">
        {!state.user.role
          ? renderNotLogged()
          : state.user.role === "user"
          ? renderUser()
          : state.user.role === "DJ"
          ? renderDJ()
          : renderAdmin()}
      </div>
    </Jumbotron>
  );
};

export default Home;
