import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RoomService from '../../services/room.service';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Room from '../Room/Room';
// TODO: CSS
import { connect } from 'react-redux';

const CreateRoom = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const roomService = new RoomService();


    const handleSubmit = async (e) => {
        e.preventDefault();
        let loggedRoom = await roomService.createRoom(state.newRoomName, state.newParticipant).data;
        console.log(loggedRoom);
        if (loggedRoom) {
            history.push(`/room/${loggedRoom.name}`);
        }
        sessionStorage.setItem('loggedRoom', JSON.stringify(loggedRoom));
        dispatch({ type: 'createroom' })
    }

    const createNewRoom = () => {
        this.userService.updateUser(
            state.updateUsername,
            state.updatePassword,
            state.updateDpt,
            state.updateFuncTeam,
            state.updateTitle).then(resp => {
                dispatch({ type: 'createRoom', room: resp.data })
            });
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    useEffect(() => {
        let loggedRoom = sessionStorage.getItem('loggedRoom');
        console.log(loggedRoom); 
        if (loggedRoom) {
            history.push(`/rooms/${loggedRoom.name}`);
        }
    })

    return (
        <Form>
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

            <Button variant="primary" onClick={handleSubmit}>
                Create a Room
            </Button>
        </Form>
    )
}

export default CreateRoom;