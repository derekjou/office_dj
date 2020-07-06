import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import EllipseMenu from '../EllipsisMenu/EllipsisMenu.js'
// TODO: CSS
import { connect } from 'react-redux';

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