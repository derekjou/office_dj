import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// TODO: CSS
import RoomService from '../../services/room.service';
import RoomIcon from './RoomIcon.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Axios from 'axios';



const RoomList = (props) => {
    const state = useSelector(state => state);

    const roomService = new RoomService();

    return (
        <ListGroup 
            variant="flush" 
            className="rooms-list"
            id="roomsList"
        >
            {props.myRooms.map(room => {
                return <RoomIcon key={room._id} room={room} />
            })}
            <Button 
                className="room-icon new-room-icon"
                id="addNewRoom"
            ><span>&#10010;</span></Button>
        </ListGroup>
    )
}

export default RoomList;