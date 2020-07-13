import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import RoomService from '../../services/room.service';
import DJSongRequest from './DJSongRequest';
import ListGroup from 'react-bootstrap/ListGroup';
import "./DJApproveSongRequests.scss";

const roomService = new RoomService();

const DJApproveSongRequest = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function pullSongRequests() {
      let songRequests = await roomService.getSongRequests(parseInt(id)); //test
      dispatch({ type: 'handleRoomSongRequestList', roomSongRequestList: songRequests.data })
      console.log(state.roomSongRequestList);
      console.log(typeof state.roomSongRequestList === 'object')
    }
    pullSongRequests();
  }, []);

  return (
    <>
      <div>
        <ListGroup responsive="lg">
          <h1>Requests</h1>
          {typeof(state.roomSongRequestList) === 'object' ? Object.values(state.roomSongRequestList).map(
            (song) => {
              console.log(song);
              return <DJSongRequest
                song={song}
              />
            }) : null}
        </ListGroup>
      </div>
    </>
  )
}


export default DJApproveSongRequest;