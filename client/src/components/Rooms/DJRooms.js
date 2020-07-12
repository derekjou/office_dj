import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Rooms.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import RoomService from "../../services/room.service";

const DJRooms = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const roomService = new RoomService();

  let loggedUsername = JSON.parse(sessionStorage.getItem("loggedUser"))
    .username;

  useEffect(() => {
    async function getDJRooms() {
      let djRooms = await roomService.getDJRooms(loggedUsername);
      let rooms = await djRooms.data;
      dispatch({ type: "setDJRooms", rooms: rooms });
    }
    getDJRooms();
  }, []);

  return (
    <>
      <Jumbotron>
        <h1>Your Rooms</h1>
        <p>Hop into a room to start playing some music!</p>
        <Container>
          <Row>
            <Col>
              <CardColumns>
                {state.djRooms
                  ? state.djRooms.map((room) => {
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
          </Row>
        </Container>
      </Jumbotron>
    </>
  );
};

export default DJRooms;
