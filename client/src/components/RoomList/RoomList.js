import React from 'react';
import { useSelector } from 'react-redux';
import RoomIcon from './RoomIcon.js';
import { Search, PlusCircle } from 'react-bootstrap-icons';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const RoomList = (props) => {
    const state = useSelector(state => state);

    return (
        <ListGroup 
            variant="flush" 
            className="rooms-list"
            id="roomsList"
        >
            {props.myRooms.map(room => {
                return <RoomIcon key={room._id} room={room} />
            })}
            <Dropdown drop='right'>
                <Dropdown.Toggle 
                    className="room-icon new-room-icon"
                    id="addNewRoom"
                >
                    <span>&#10010;</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="new-room-dropout">
                    <Dropdown.Item
                        href='/userRooms'
                    >
                        <Search className='action-icon'/>
                        <span>Find a Room to Join</span>
                    </Dropdown.Item>
                    {/* Check if dj */}
                    {state.user.role === 'DJ' ?
                        <>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                href='/createRoom'
                            >
                                <PlusCircle className='action-icon' />
                                <span>Create a Room</span>
                            </Dropdown.Item>
                        </>
                    : null }
                </Dropdown.Menu>
            </Dropdown>
        </ListGroup>
    )
}

export default RoomList;