import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Check, Trash } from 'react-bootstrap-icons';
import RoomService from '../../services/room.service';
import ListGroup from 'react-bootstrap/ListGroup';

const DJSongRequest = (props) => {
  const state = useSelector(state => state);
  const history = useHistory();
  const location = useLocation();

  const roomService = new RoomService()

  const acceptSongRequest = async () => {
    let resp = await roomService.approveSongRequest(state.currentRoom._id, props.song._id);
    if (resp.status === 204) {
      //TODO: success state
    }
  }

  const rejectSongRequest = async () => {
    let resp = await roomService.rejectSongRequest(state.currentRoom._id, props.song._id);
    if (resp.status === 204) {
      history.push(location.pathname); // dynamically reloads the page.
    }
  }

  return (
    <ListGroup.Item>
      <span className=''>{props.song.title}</span>
      <span className=''>{props.song.artists.join(', ')}</span>
      <span className='actions'>
        <Button onClick={acceptSongRequest}>
          <Check />
        </Button>
        <Button onClick={rejectSongRequest}>
          <Trash />
        </Button>
      </span>
    </ListGroup.Item>
  )
}

export default DJSongRequest;