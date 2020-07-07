import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Participants.scss'
import { connect } from 'react-redux';
import Participant from './Participant';

const JoinRoom = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleKeyDown = e => {
    if (e.key === 'Enter') { 
      //TODO: joinroom()
    }
  }

  const searchRooms = async () => {
    console.log(state.roomSearchName);
    let query = state.roomSearchName;
    let newRoom = await roomService.findRooms(query)
    if (newRoom.status === 200) {
      dispatch({ type: 'createRoom', room: newRoom.data });
      sessionStorage.setItem('loggedRoom', JSON.stringify(newRoom.data));
      console.log(newRoom);
      history.push("/myroom");
    }
  }


  const roomSearch = () => {
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>Looks like you're not a part of any rooms yet.</Card.Title>
            <Card.Text>Why don't we find you some?</Card.Text>
            <Form.Group>
              <Form.Label>Find a room</Form.Label>
              <InputGroup size="lg">
                <Form.Control 
                  type="text" 
                  size="lg" 
                  placeholder="Search by room name"
                  onChange={e => {
                    dispatch({ type: 'handleRoomSearchName', roomSearchName: e.target.value })

                  }}
                  onKeyDown={(e) => handleKeyDown(e)} />
                />
                <InputGroup.Append>
                  <Button 
                    variant="secondary"
                  >Search</Button>
                </InputGroup.Append>
                {}
              </InputGroup>
            </Form.Group>
          </Card.Body>
        </Card>
      </>
    )
  }

  
}

export default JoinRoom;