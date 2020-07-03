import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RoomService from '../../services/room.service';
import './Room.scss';
import '../RoomList/RoomList.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RoomList from '../RoomList/RoomList.js';
import Participants from '../Participants/Participants';
import { connect } from 'react-redux';



const Room = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const roomService = new RoomService();

    // let loggedUser = sessionStorage.getItem('loggedUser');

    let loggedUser = {
        username: "victoria",
        password: "pass",
        department: "Software Delivery",
        functional_team: "UI/UX",
        title: "Delevoper",
        role: "DJ"
    }

    useEffect( () =>  
        getRoomList(), []
    ); 

    const getRoomList = async () => {
        await roomService.getUserRooms(loggedUser.username).then(res => {
            dispatch({ type: 'handleMyRoom', myRooms: res.data })
            return res.data
        }).then(res => {
            getCurrentRoom(res)
        });
    }

    const getCurrentRoom = (rooms) => {
        dispatch({ type: 'getCurrentRoom', currentRoom: rooms[0] })
    }
    
    return (
        <Container>
            <Row>
                <Col id="roomList-wrapper">
                    <RoomList 
                        id="roomList"
                        myRooms={state.myRooms} 
                    />
                </Col>
                <Col id="content-wrapper">
                    <Row id="roomname-wrapper">
                        <h3 id="roomname">{state.currentRoom.name}</h3>
                    </Row>
                    <Row>
                        <Col id="playlist-wrapper">
                            {/* TODO: Playlists Component */}
                        </Col>
                        <Col id="participants-wrapper">
                            <Participants participants={state.myRooms.participants} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Room;