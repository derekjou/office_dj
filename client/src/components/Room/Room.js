import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
// TODO: CSS
import RoomService from '../../services/room.service'
import Dashboard from './dashboard.component';
import { connect } from 'react-redux';



class Room extends Component {
    roomService = new RoomService();
    constructor(props) {
        super(props)
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
                                <Playlists />
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

export default connect(mapStateToProps, mapDispatchToProps)(Room);