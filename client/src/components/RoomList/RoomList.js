import React, { Component } from 'react';
// TODO: CSS
import RoomService from '../../services/room.service';
import RoomIcon from 'RoomIcon.js';
import ListGroup from 'react-bootstrap/ListGroup';
import { connect } from 'react-redux';



class RoomList extends Component {
    roomService = new RoomService();
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.roomService.getUserRooms().then(res => {
            console.log(res);
            this.props.queryRooms(res.data);
        });
    }

    render() {
        <ListGroup variant="flush" className="rooms-list">
            {this.props.roomlist.map(room => {
                return <RoomIcon key={room._id} room={room} />
            })}
        </ListGroup>
    }
}

Participants.PropTypes = {
    participants: PropTypes.array
}

function mapStateToProps(state) {
    const { displayRoomList } = state;
    return { roomList: displayRoomList }
}
function mapDispatchToProps(dispatch) {
    return {
        queryRooms: (roomList) => dispatch({ type: 'queryRooms', roomList: roomList })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);