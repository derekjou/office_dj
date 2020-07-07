import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import RoomService from '../../services/room.service';

// React Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const JoinRoom = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const roomService = new RoomService();

  const [searchResults, setSearchResults] = useState(false)

  const handleKeyDown = e => {
    if (e.key === 'Enter') { 
      //TODO: joinroom()
    }
  }

  const searchRooms = async () => {
    console.log(state.roomSearchQuery);
    let query = state.roomSearchQuery;
    let roomSearchList = await roomService.findRooms(query)
    if (roomSearchList.status === 200) {
      dispatch({ type: 'handleRoomSearch', roomSearchList: roomSearchList.data });
      setSearchResults(true)
    }
  }

  const doSomething = () => {
    /* placeholder for action to join a room */
  }

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
                  dispatch({ type: 'handleRoomSearchQuery', roomSearchQuery: e.target.value });
                  searchRooms();
                }}
                onKeyDown={(e) => handleKeyDown(e)} 
              />
              <InputGroup.Append>
                <Button 
                  variant="secondary"
                >Search</Button>
              </InputGroup.Append>
            </InputGroup>
            {searchResults ?
              <ListGroup className="search-res-autocomplete">
                {state.roomSearchList.map(room => {
                  return (<>
                    <ListGroup.Item
                      key={room.name}
                      onClick={doSomething()}
                      className="search-res-wrapper"
                    >
                      <span className="search-res name">{room.name}</span>
                      <span className="search-res owner">{room.owner}</span>
                    </ListGroup.Item>
                  </>)
                })
                }
              </ListGroup>
              : null}
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  )
}

export default JoinRoom;