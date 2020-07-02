import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
// TODO: CSS
import { connect } from 'react-redux';
import Participant from './Participant';

class Participants extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.roomService.getParticipants().then(res => {
            console.log(res);
            this.props.queryUsers(res.data);
        });
    }

    render() {
        return (
            <>
                <h4 className="ui-header">Listeners</h4>
                <ListGroup variant="flush">
                    {this.props.participants.map(participant => {
                        return <Participant key={participant._id} participant={participant}></Participant>
                    })}
                </ListGroup>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { displayParticipants } = state;
    return { participants: displayParticipants }
}
function mapDispatchToProps(dispatch) {
    return {
        queryUsers: (participants) => dispatch({ type: 'queryUsers', participants: participants })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Participants);