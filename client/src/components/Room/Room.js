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

    componentDidMount() {
        
    }

    

}

export default connect(mapStateToProps, mapDispatchToProps)(Room);