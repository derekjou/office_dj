import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import Button, { Form } from 'react-bootstrap/Button';
import UserService from '../../services/user.service'
// TODO: CSS
import { connect } from 'react-redux';

class Participants extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <ListGroup variant="flush">
                {this.props.participants.map((participant) => (
                    <ListGroup.Item key={participant.id}>
                        <h4>{ participant.username }</h4>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    }
}

Participants.PropTypes = {
    participants: PropTypes.array
}

export default Participants