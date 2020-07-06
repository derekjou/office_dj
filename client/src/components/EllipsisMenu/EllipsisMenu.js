import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import Dropdown from 'react-bootstrap/Dropdown';
// TODO: CSS
import { connect } from 'react-redux';

class EllipsisMenu extends Component {
    render() {
        return (
            <>
                <Dropdown.Toggle key="" className="ellipse-dropdown">&#x22ee;</Dropdown.Toggle>
                {/* TODO: change the dropdown menu out with participant acitons */}
                <Dropdown.Menu>
                    <a href="#">temp link</a>
                </Dropdown.Menu>
            </>
        )
    }
}

export default EllipsisMenu