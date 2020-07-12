import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const RoomIcon = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(props)

    // const goToRoom = () => {
    //     console.log(props.room.name)
    //     dispatch({ type: 'getCurrentRoom', currentRoom: props.room })
    // }

    return(
        <>
            <ListGroup.Item className="room-icon-wrapper">
                <Button 
                    href={`/room/${props.room._id}`}
                    className="room-icon"
                >
                    <span>{props.room.name.charAt(0)}</span>
                </Button>
            </ListGroup.Item>
        </>
    )
}

export default RoomIcon