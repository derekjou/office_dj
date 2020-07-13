import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RoomService from '../../services/room.service';
import Dropdown from 'react-bootstrap/Dropdown';
import { BarChartFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import './SongHistory.scss'

const SongHistory = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const roomService = new RoomService();

  const getSongHistory = async () => {
    let songHistory = await roomService.getSongHistory(state.currentRoom._id, props.song._id);
    console.log(songHistory)
    sessionStorage.setItem('loggedRoomList', JSON.stringify(songHistory.data))
    dispatch({ type: 'handleSongHistory', songHistory: songHistory.data });
  }

  return (
    <Dropdown className='song-history-container'>
      <Dropdown.Toggle className='song-history-wrapper'>
        <Button
          onClick={() => { getSongHistory() }}
        >
          <BarChartFill />
        </Button>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className={'song-history-stats song-history-request'}>
          <span>Requests for {props.song.title}:</span> 
          <span>{state.songHistory ? 
                  state.songHistory.requests
                : null}</span>
        </Dropdown.Item>
        <Dropdown.Item className={'song-history-stats song-history-plays'}>
          <span>Times {props.song.title} has been played:</span>
          <span>{state.songHistory ?
                  state.songHistory.plays
                : null}</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SongHistory