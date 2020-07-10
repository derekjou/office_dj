import React from 'react';
// TODO: CSS
import RoomIcon from './RoomIcon.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const RoomList = (props) => {
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