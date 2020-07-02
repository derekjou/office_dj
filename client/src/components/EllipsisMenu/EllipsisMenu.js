import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import Dropdown from 'react-bootstrap/Dropdown';
// TODO: CSS
import { connect } from 'react-redux';

class EllipseMenu extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <>
                <Dropdown.Toggle key="" className="ellipse-dropdown">&#x22ee;</Dropdown.Toggle>
                <Dropdown.Menu>
                    <a href="#">temp link</a>
                </Dropdown.Menu>
            </>
        )
    }
}