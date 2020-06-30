import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Button, { Form } from 'react-bootstrap/Button';
import UserService from '../../services/user.service'
// TODO: CSS
import { connect } from 'react-redux';

class CreateRoom extends Component {

    constructor(props) {
        super(props)

    }

    getCreateRoomForm() {
        return(
            <Form>
                <Form.Group controlId="formRoomName">
                    <Form.Label>Name Your Room</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group controlId="form">
                    <Form.Label>Add Some People</Form.Label>
                    <Form.Control type="text" placeholder="Enter usernames" />
                    <Form.Text className="text-muted">
                        You can add more people later.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary">
                    Create a Room
                </Button>
            </Form>
        )
    }

    handleSubmit = event => {
        event.preventDefault;

        const room = {
            name = this.state.name

        }

        axios.post()
    }

    creationSuccess() {
        // redirect to dj room

    }

    render() {
        return this.getCreateRoomForm();
    }
}

function mapStateToProps(state) {
    const {roomName, participants} = state;
    return {
        roomName: roomName,
        participants: participants,
    }
}