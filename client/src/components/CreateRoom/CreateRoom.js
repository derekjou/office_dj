import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RoomService from '../../services/room.service';
import Room from '../Room/Room';
// TODO: CSS
import { connect } from 'react-redux';

const CreateRoom = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const roomService = new RoomService();

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let loggedRoom = await roomService.createRoom(state.name, state.participants)
        sessionStorage.setItem('loggedRoom', JSON.stringify(loggedRoom));
        dispatch({ type: 'login' })
    }

    useEffect(() => {
        console.log(state); 
        let loggedRoom = sessionStorage.getItem('loggedRoom');
        if (loggedRoom) {
            history.push(`/rooms/${loggedRoom.name}`);
        }
    })

    return (
        <Form>
            <Form.Group controlId="formRoomName">
                <Form.Label>Name Your Room</Form.Label>
                <Form.Control type="text"
                    onChange={this.props.handleRoomInput}
                    onKeyDown={(e) => handleKeyDown(e)} />
            </Form.Group>

            <Form.Group controlId="form">
                <Form.Label>Add Someone</Form.Label>
                <Form.Control type="text" placeholder="Enter usernames"
                    onChange={this.props.handleRoomInput}
                    onKeyDown={(e) => handleKeyDown(e)} />
                <Form.Control type="text" placeholder="Enter usernames"
                    onChange={this.props.handleRoomInput}
                    onKeyDown={(e) => handleKeyDown(e)} />
                <Form.Control type="text" placeholder="Enter usernames"
                    onChange={this.props.handleRoomInput}
                    onKeyDown={(e) => handleKeyDown(e)} />
                <Form.Text className="text-muted">
                    You can add more people later.
                    </Form.Text>
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit()}>
                Create a Room
                </Button>
        </Form>
    )
}

export default CreateRoom;