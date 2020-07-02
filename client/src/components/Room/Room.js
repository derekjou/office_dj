import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
// TODO: CSS
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RoomList from '../RoomList/RoomList.js';
import Participants from '../Participants/Participants';
import RoomService from '../../services/room.service'
import { connect } from 'react-redux';



class Room extends Component {
    roomService = new RoomService();
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.roomService.getRoom().then(res => {
            console.log(res);
            this.props.queryUsers(res.data);
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col id="roomlist-wrapper">
                        <RoomList />
                    </Col>
                    <Col id="content-wrapper">
                        <Row>
                            <h3 id="roomname-wrapper">
                                {this.state.room.name}
                            </h3>
                        </Row>
                        <Row>
                            <Col id="playlist-wrapper">
                               {/* TODO: Playlists Component */}
                            </Col>
                            <Col id="participants-wrapper">
                                <Participants />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Room;