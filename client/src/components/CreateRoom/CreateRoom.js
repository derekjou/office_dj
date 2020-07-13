import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import RoomService from "../../services/room.service";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CreateRoom.scss";

const CreateRoom = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const roomService = new RoomService();

  const createNewRoom = async () => {
    console.log(state.user.username);
    let room = {
      owner: state.user.username,
      name: state.newRoomName,
    };
    let newRoom = await roomService.createRoom(room);
    if (newRoom.status === 200) {
      dispatch({ type: "createRoom", room: newRoom.data });
      sessionStorage.setItem("loggedRoom", JSON.stringify(newRoom.data));
      console.log(newRoom);
      history.push("/djRooms");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createNewRoom();
    }
  };

  return (
    <Form className="form-container">
      <h1 className="Title">Create a Room</h1>

      <Form.Group controlId="formRoomName">
        <Form.Label>Name Your Room</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) =>
            dispatch({ type: "handleNewRoomName", newRoomName: e.target.value })
          }
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </Form.Group>

      <Button variant="primary" onClick={createNewRoom}>
        Create a Room
      </Button>
    </Form>
  );
};

export default CreateRoom;
