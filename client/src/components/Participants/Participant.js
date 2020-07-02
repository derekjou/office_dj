import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import ListGroup from 'react-bootstrap/ListGroup';
import EllipseMenu from '../EllipsisMenu/EllipsisMenu.js'
// TODO: CSS
import { connect } from 'react-redux';

class Participant extends Component {
    constructor(props) {
        super(props)

        this.handleHover = this.handleHover.bind(this);
    }

    handleHover() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <>
                <ListGroup.Item
                    onMouseOver={this.handleHover}
                    className={`participant-icon ${this.state.isToggleOn ? "open" : "closed"}`}
                >
                    <span>{this.props.participant.username}</span>
                </ListGroup.Item>
            </>
        )
    }
}

Participant.PropTypes = {
    participant: PropTypes.string
}

export default Participant