import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import RoomService from "../../services/room.service";
import "./Room.scss";
import "../RoomList/RoomList.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import RoomList from "../RoomList/RoomList.js";
import Participants from "../Participants/Participants";
import Player from "../Player/Player";
import JoinRoom from "../JoinRoom/JoinRoom";
import RequestSongToPlaylist from "../RequestSongToPlaylist/RequestSongToPlaylist";
import ListGroup from "react-bootstrap/ListGroup";
import DJApproveSongRequests from "../DJApproveSongRequests/DJApproveSongRequests";

const Room = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const roomService = new RoomService();

  let loggedUsername = JSON.parse(sessionStorage.getItem("loggedUser"))
    .username;

  useEffect(() => {
    async function getRoomList() {
      let myRooms = await roomService.getUsersRooms(loggedUsername);
      let currRoom = await roomService.getRoom(id);
      console.log("here", loggedUsername);
      sessionStorage.setItem("loggedRoomList", JSON.stringify(myRooms.data));
      dispatch({ type: "handleMyRooms", myRooms: myRooms.data });
      dispatch({
        type: "handleCurrentRoom",
        currentRoom: currRoom.data
          ? currRoom.data
          : {
              id: -1,
              name: "",
              owner: "",
              participants: "",
              playlist: {},
              date_created: "",
            },
      });
    }
    getRoomList();
  }, []);

  const isOwner = () => {
    return state.currentRoom.owner === loggedUsername;
  };

  return (
    <Container fluid>
      <Row>
        <Col id="roomList-wrapper">
          <RoomList id="roomList" myRooms={state.myRooms} />
        </Col>
        {state.currentRoom.playlist ? (
          <Col id="content-wrapper">
            <Row id="roomname-wrapper">
              <h3 id="roomname">{state.currentRoom.name}</h3>
            </Row>
            <Row>
              <Col id="playlist-wrapper">
                <Player currentRoom={state.currentRoom} />
              </Col>
              {isOwner() ? (
                <Col>
                  <DJApproveSongRequests />
                </Col>
              ) : null}
              <Col id="participants-wrapper">
                <Participants participants={state.currentRoom.participants} />
                {console.log(state.currentRoom.owner)}
                {isOwner() ? (
                  <ListGroup.Item className="check-requests-wrapper">
                    <Button
                      className="check-requests-button"
                      onClick={() => {
                        history.push({
                          pathname: `/joinrequests/${state.currentRoom._id}`,
                          state: {
                            roomName: state.currentRoom.name,
                            roomOwner: state.currentRoom.owner,
                          },
                        });
                      }}
                    >
                      Check Requests
                    </Button>
                  </ListGroup.Item>
                ) : null}
              </Col>
            </Row>
          </Col>
        ) : (
          <Col>
            <JoinRoom hasRooms={false}/>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Room;
