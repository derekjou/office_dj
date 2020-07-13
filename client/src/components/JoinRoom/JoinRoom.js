import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RoomService from '../../services/room.service';
import RoomRequestSuccess from './RoomRequestSuccess.js';

// React Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const JoinRoom = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const roomService = new RoomService();

  const [roomRequestSent, setRoomRequestSent] = useState(false)


  let loggedUsername = JSON.parse(sessionStorage.getItem('loggedUser')).username

  const handleKeyDown = e => {
    if (e.key === 'Enter') { 
      //TODO: joinroom()
    }
  }

  const searchRooms = async (query) => {
    if(query.trim().length < 1) {
      dispatch({ type: 'handleRoomSearch', roomSearchList: [] });
    } else {
      let roomSearchList = await roomService.findRooms(query)
      if (roomSearchList.status === 200) {
        dispatch({ type: 'handleRoomSearch', roomSearchList: roomSearchList.data });
      }
    }
  }

  const requestJoin = async (name, owner) => {
    console.log(`${name} ${owner} ${loggedUsername}`)
    /* placeholder for action to join a room */
    let response = await roomService.sendJoinRequest(name, owner, loggedUsername);
    if (response.status === 204) {
      dispatch({ type: 'handleRoomRequestSuccess', requestRoom: {'name': name, 'owner': owner} });
      setRoomRequestSent(true)
      setTimeout(() => {
        setRoomRequestSent(false)
      }, 10000)
    }
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
                  searchRooms(e.target.value);
                }}
                onKeyDown={(e) => handleKeyDown(e)} 
              />
              <InputGroup.Append>
                <Button 
                  variant="primary"
                >Search</Button>
              </InputGroup.Append>
            </InputGroup>
            {state.roomSearchList ?
              <ListGroup className="search-res-autocomplete">
                {state.roomSearchList.map(room => {
                  return (<>
                    <ListGroup.Item
                      key={room.name}
                      onClick={()=>{requestJoin(room.name, room.owner)}}
                      className="search-res-wrapper"
                    >
                      <span className="search-res name">{room.name}</span>
                      <span className="search-res owner text-muted">{room.owner}</span>
                    </ListGroup.Item>
                  </>)
                })
                }
              </ListGroup>
              : null}
          </Form.Group>
        </Card.Body>
      </Card>
      {roomRequestSent ?
        <RoomRequestSuccess
          room={state.requestRoom}
          roomRequestSent={state.roomRequestSent}
          setRoomRequestSent={state.setRoomRequestSent}
        />
      : null}
    </>
  )
}

export default JoinRoom;