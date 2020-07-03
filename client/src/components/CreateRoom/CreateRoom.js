import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RoomService from '../../services/room.service';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Room from '../Room/Room';
import './CreateRoom.scss';
import { connect } from 'react-redux';

const CreateRoom = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const roomService = new RoomService();

    const createNewRoom = async () => {
        console.log(state.user.username);
        let room = {
            owner: state.username,
            name: state.newRoomName,
            participants: state.newParticipant
        }
        let loggedRoom = await roomService.createRoom(room).then(resp => {
                dispatch({ type: 'createRoom', room: resp.data })
            });
        sessionStorage.setItem('loggedRoom', JSON.stringify(loggedRoom));
        if (loggedRoom) {
            history.push(`/myroom`);
        }
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') { createNewRoom(); }
    }

    return (
        <Form className="form-container">
            <h1 className="Title" >Create a Room</h1>

            <Form.Group controlId="formRoomName">
                <Form.Label>Name Your Room</Form.Label>
                <Form.Control type="text"
                    onChange={e => dispatch({ type: 'handleNewRoomName', newRoomName: e.target.value })}
                    onKeyDown={(e) => handleKeyDown(e)} />
            </Form.Group>

            <Form.Group controlId="form">
                <Form.Label>Add Someone</Form.Label>
                <Form.Control type="text" placeholder="Enter usernames"
                    onChange={e => dispatch({ type: 'handleNewParticipant', newParticipant: e.target.value })}
                    onKeyDown={(e) => handleKeyDown(e)} />
                <Form.Text className="text-muted">
                    You can add more people later.
                </Form.Text>
            </Form.Group>

            <Button variant="primary" onClick={createNewRoom}>
                Create a Room
            </Button>
        </Form>
    )
}

export default CreateRoom;