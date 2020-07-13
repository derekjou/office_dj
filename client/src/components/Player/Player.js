import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RoomService from "../../services/room.service";
import Queue from './Queue';
import Controls from './Controls';
import RequestSongToPlaylist from '../RequestSongToPlaylist/RequestSongToPlaylist';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./Player.scss";

const Player = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const roomService = new RoomService();
  let username = JSON.parse(sessionStorage.getItem('loggedUser')).username;

  useEffect(() => {
    async function getPlaylist() {
      let resp = await roomService.getPlaylist(props.currentRoom._id);
      let playlist = await resp.data;
      sessionStorage.setItem("loggedPlaylist", JSON.stringify(playlist));
      dispatch({ type: "setCurrentSong", currentSong: playlist.playlist[0] });
      if (!playlist.playlist.length) return;
    }
    getPlaylist();
  }, [])

  return (
    <div>
      <Row>
        {state.currentRoom.owner === username ? <Controls currentRoom={props.currentRoom}/> : <RequestSongToPlaylist />}
        
        <Queue />
      </Row>
    </div>
  );
};

export default Player;
