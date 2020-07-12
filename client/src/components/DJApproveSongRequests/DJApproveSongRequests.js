import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import RoomService from '../../services/room.service';
import DJSongRequest from './DJSongRequest';
import ListGroup from 'react-bootstrap/ListGroup';

const roomService = new RoomService();

const DJApproveSongRequest = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function pullSongRequests() {
      let songRequests = await roomService.getSongRequests(4);
      console.log(songRequests.data)
      // dispatch({ type: 'handleRoomSongRequestList', roomSongRequestList: songRequests.data })
    }
    dispatch({
      type: 'handleRoomSongRequestList',
      roomSongRequestList: [{ _id: 88, title: 'Bohemian Rhapsody', artists: ['Queen'] }, { _id: 88, title: 'Killer Queen', artists: ['Queen'] }]
    })
    console.log(state.roomSongRequestList);
    pullSongRequests();
  }, []);

  return (
    <>
      <div>
        <ListGroup responsive="lg">
          <ListGroup.Item><h1>SOME DUMMY TEXT</h1></ListGroup.Item>
          {Array.isArray(state.roomSongRequestList) ? state.roomSongRequestList.map(
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