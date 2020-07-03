import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
// TODO: CSS
import { connect } from 'react-redux';

const RoomIcon = (props) => {
    console.log(props.room)

    const goToRoom = (name) => {
        
    }

    return(
        <>
            <ListGroup.Item className="room-icon-wrapper">
                <Button 
                    href={`rooms/${props.room.name}`}
                    className="room-icon"
                >
                    <span>hi</span>
                </Button>
            </ListGroup.Item>
        </>
    )
}

export default RoomIcon