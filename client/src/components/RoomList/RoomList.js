import React, { Component } from 'react';
// TODO: CSS
import RoomService from '../../services/room.service';
import RoomIcon from './RoomIcon.js';
import ListGroup from 'react-bootstrap/ListGroup';
import { connect } from 'react-redux';



class RoomList extends Component {
    roomService = new RoomService();
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.roomService.getUserRooms(this.props.user).then(res => {
            console.log(res);
            this.props.queryRooms(res.data);
        });
    }

    render() {
        return (
            <ListGroup variant="flush" className="rooms-list">
                {this.props.myRooms.map(room => {
                    return <RoomIcon key={room._id} room={room} />
                })}
            </ListGroup>
        )
    }
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