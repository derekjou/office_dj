import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RoomService from '../../services/room.service';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './CreateRoom.scss';

const CreateRoom = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const roomService = new RoomService();

    const createNewRoom = async () => {
        console.log(state.user.username);
        let room = {
            owner: state.user.username,
            name: state.newRoomName,
            participants: [state.user.username, state.newParticipant]
        }
        let newRoom = await roomService.createRoom(room)
        if (newRoom.status >= 400) {
            setError(true);
            setErrorMsg(newRoom.data);
        } else if (newRoom.status === 200) {
            dispatch({ type: 'createRoom', room: newRoom.data });
            sessionStorage.setItem('loggedRoom', JSON.stringify(newRoom.data));
            console.log(newRoom);
            history.push("/myroom"); 
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
                {error ? 
                    <Form.Control.Feedback>{errorMsg}.</Form.Control.Feedback> 
                : null}
                <Form.Text className="text-muted">
                    You can add more people later.
                </Form.Text>
            </Form.Group>

            <Button variant="primary" onClick={createNewRoom}>
                Create a Room
            </Button>
            {error ? 
                <Alert variant='danger'>
                    {errorMsg}. Please check your spelling or try a different user.
                </Alert>
            : null}
        </Form>
    )
}

export default CreateRoom;