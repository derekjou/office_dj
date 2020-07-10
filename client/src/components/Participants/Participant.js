import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
// TODO: CSS

const Participant = (props) => {
    return (
        <>
            <ListGroup.Item className={'participant-icon'}>
                <span>{props.participant}</span>
            </ListGroup.Item>
        </>
    )
}

export default Participant