import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import "./Rooms.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import JoinRoom from "../JoinRoom/JoinRoom";
import RoomService from "../../services/room.service";

const UserRooms = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const roomService = new RoomService();

  let loggedUsername = JSON.parse(sessionStorage.getItem("loggedUser")).username;

  useEffect(() => {
    async function getUserRooms() {
      let userRooms = await roomService.getUsersRooms(loggedUsername);
      let rooms = await userRooms.data;
      dispatch({ type: "setUserRooms", rooms: rooms });
    }
    getUserRooms();
  }, []);

  return (
    <>
      <Jumbotron>
        <h1>Member Rooms</h1>
        <p>Hop into a room you're already a part of or join a new room!</p>
        <Container>
          <Row>
            <Col sm={7}>
              <CardColumns>
                {state.userRooms
                  ? state.userRooms.map((room) => {
                      return (
                        <Card
                          className="mb-0"
                          bg="light"
                        >
                          <Card.Header>{room.name}</Card.Header>
                          <Card.Body>
                            <Button
                              block
                              onClick={() => history.push(`/room/${room._id}`)}
                            >
                              Enter
                            </Button>
                          </Card.Body>
                        </Card>
                      );
                    })
                  : null}
              </CardColumns>
            </Col>
            <Col sm={5}>
              <JoinRoom hasRooms={state.userRooms.length > 0 ? true : false}/>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </>
  );
};

export default UserRooms;
