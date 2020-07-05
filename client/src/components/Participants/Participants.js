import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import './Participants.scss'
import { connect } from 'react-redux';
import Participant from './Participant';

const Participants = (props) => {
    return (
        <>
            <h4 className="ui-header">Listeners</h4>
            <ListGroup variant="flush">
                {props.participants === [] ? props.participants.map(participant => {
                    return <Participant key={participant._id} participant={participant} />
                }) : <Participant key={props.participants._id} participant={props.participants} />}
            </ListGroup>
        </>
    )
}

export default Participants;