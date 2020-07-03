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
    const dispatch = useDispatch();

    console.log(`myRooms: ${state.myRooms}`)
    console.log(`props: ${props}`)

    const roomService = new RoomService();

    return (
        <ListGroup 
            variant="flush" 
            className="rooms-list"
            id="roomsList"
        >
            {state.myRooms.map(room => {
                console.log(room.name);
                return <RoomIcon key={room._id} room={room} />
            })}
            {/* <RoomIcon key="1" room={{ name: 'hi' }} />
            <RoomIcon key="2" room={{ name: 'hello' }} />
            <RoomIcon key="3" room={{ name: 'hola' }} /> */}
            <Button 
                className="room-icon new-room-icon"
                id="addNewRoom"
            ><span>&#10010;</span></Button>
        </ListGroup>
    )
}

// function mapStateToProps(state) {
//     const { displayRoomList } = state;
//     return { roomList: displayRoomList }
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         queryRooms: (roomList) => dispatch({ type: 'queryRooms', roomList: roomList })
//     }
// }

export default RoomList;