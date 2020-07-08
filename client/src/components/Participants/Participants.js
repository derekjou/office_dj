import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './Participants.scss'
import Participant from './Participant';

const Participants = (props) => {
    return (
        <>
            <h4 className="ui-header">Listeners</h4>
            <ListGroup variant="flush">
                {typeof props.participants === 'object' ? Object.keys(props.participants).map(participant => {
                    return <Participant key={participant} participant={participant} />
                }) : <Participant key={props.participants} participant={props.participants} />}
            </ListGroup>
        </>
    )
}

export default Participants;