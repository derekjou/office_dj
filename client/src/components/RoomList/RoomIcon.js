import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ListGroup from 'react-bootstrap/ListGroup';
// TODO: CSS
import { connect } from 'react-redux';

class RoomIcon extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <>
                <ListGroup.Item>
                    <a href={`rooms/${this.props.name}`} className=""></a>
                </ListGroup.Item>
            </>
        )
    }
}

export default RoomIcon