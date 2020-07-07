import React, { useEffect, useState } from 'react';
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
import JoinRoom from '../JoinRoom/JoinRoom';



const Room = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [hasRooms, setHasRooms] = useState(false)

    const roomService = new RoomService();

    let loggedUsername = JSON.parse(sessionStorage.getItem('loggedUser')).username

    useEffect( () => {
        async function getRoomList() {
            let myRooms = await roomService.getUserRooms(loggedUsername);
            sessionStorage.setItem('loggedRoomList', JSON.stringify(myRooms.data))
            dispatch({ type: 'handleMyRooms', myRooms: myRooms.data });
            getCurrentRoom(myRooms.data);
        }
        getRoomList();
    }, []);

    const getCurrentRoom = (rooms) => {
        dispatch({ type: 'handleCurrentRoom', currentRoom: rooms[0] })
        setHasRooms(true)
    }
    
    const roomLayout = () => {
        return (
            <Container fluid>
                <Row>
                    <Col id="roomList-wrapper">
                        <RoomList
                            id="roomList"
                            myRooms={state.myRooms}
                        />
                    </Col>
                    {state.hasRooms ? 
                        <Col id="content-wrapper">
                            <Row id="roomname-wrapper">
                                <h3 id="roomname">{state.currentRoom.name}</h3>
                            </Row>
                            <Row>
                                <Col id="playlist-wrapper">
                                        {/* TODO: Playlists Component */}
                                    
                                </Col>
                                <Col id="participants-wrapper">
                                    <Participants participants={state.currentRoom.participants} />
                                </Col>
                            </Row>
                        </Col>
                    :
                        <Col>
                            <JoinRoom />
                        </Col>
                    }
                </Row>
            </Container>
        );
    }

    return roomLayout()
}

export default Room;