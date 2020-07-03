import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
// TODO: CSS
import { connect } from 'react-redux';

const RoomIcon = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(props)

    const goToRoom = () => {
        console.log(props.room.name)
        dispatch({ type: 'getCurrentRoom', currentRoom: props.room })
    }

    useEffect()

    return(
        <>
            <ListGroup.Item className="room-icon-wrapper">
                <Button 
                    href={`rooms/${props.room.name}`}
                    className="room-icon"
                    onClick={() => { goToRoom() }}
                >
                    <span>hi</span>
                </Button>
            </ListGroup.Item>
        </>
    )
}

export default RoomIcon