import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RoomService from "../../services/room.service";
import "./Player.scss";

const Controls = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const roomService = new RoomService();

  const updateTimestamp = async (timestamp) => {
    await roomService.updateTimestamp(props.currentRoom._id, timestamp);
  };

  const nextSong = async () => {
    let resp = await roomService.removePlaylistSong(props.currentRoom._id);
    let playlist = await resp.data;
    let updatedRoom = props.currentRoom;
    updatedRoom.playlist = playlist;
    dispatch({ type: "handleCurrentRoom", currentRoom: updatedRoom });
    sessionStorage.setItem("loggedPlaylist", JSON.stringify(playlist));
    if (playlist.playlist.length === 0) {
      dispatch({
        type: "setCurrentSong",
        currentSong: {
          _id: "",
          title: "",
          album: "",
          artists: [],
          genre: "",
          url: "",
          album_url: "",
        },
      });
      updateTimestamp(0);
      alert("no more songs!");
      return;
    } else {
      dispatch({ type: "setCurrentSong", currentSong: playlist.playlist[0] });
      let audio = document.getElementById("audio");
      audio.load();
      audio.play();
    }
  };

  window.addEventListener("beforeunload", () => {
    let audio = document.getElementById("audio");
    let timestamp = audio.currentTime;
    sessionStorage.setItem("loggedPlaylist", null);
    updateTimestamp(timestamp);
  });

  useEffect(() => {
    async function getPlaylist() {
      let resp = await roomService.getPlaylist(props.currentRoom._id);
      let playlist = await resp.data;
      sessionStorage.setItem("loggedPlaylist", JSON.stringify(playlist));
      dispatch({ type: "setCurrentSong", currentSong: playlist.playlist[0] });
      if (!playlist.playlist.length) return;
      let audio = document.getElementById("audio");
      let source = document.getElementById("source");
      source.src = playlist.playlist[0].url;
      audio.currentTime = playlist.currentTime;
      audio.load();
    }
    function setPlayerListeners() {
      let aud = document.getElementById("audio");
      let playPause = document.getElementsByClassName("play-pause")[0];
      let playNext = document.getElementsByClassName("next")[0];
      let progress = document.getElementsByClassName("progress")[0];

      playPause.addEventListener("click", () => {
        if (aud.paused) {
          aud.play();
          playPause.classList.remove("icon-play");
          playPause.classList.add("icon-stop");
        } else {
          aud.pause();
          playPause.classList.remove("icon-stop");
          playPause.classList.add("icon-play");
        }
      });

      playNext.addEventListener("click", () => {
        if (aud.paused) {
          aud.play();
          playPause.classList.remove("icon-play");
          playPause.classList.add("icon-stop");
        }
        nextSong();
      });
      aud.ontimeupdate = () => {
        progress.style.width = (aud.currentTime / aud.duration) * 100 + "%";
      };
    }
    setPlayerListeners();
    getPlaylist();
  }, []);

  return (
    <>
      <audio id="audio" onEnded={nextSong}>
        <source
          id="source"
          src={state.currentSong ? state.currentSong.url : ""}
        />
      </audio>
      <div className="player">
        <img
          alt="album cover"
          style={{ 'color': '#3D5AF1' }}
          src={state.currentSong ? state.currentSong.album_url : ""}
        />
        <div className="info">
          <div className="name">
            {state.currentSong ? state.currentSong.title : ""}
          </div>
          <div className="artists">
            {state.currentSong && state.currentSong.artists.length > 0
              ? state.currentSong.artists.join(", ")
              : ""}
          </div>
        </div>
        <div className="btns">
          <div className="iconfont play-pause icon-play"></div>
          <div className="iconfont next icon-next"></div>
        </div>
        <div className="progress"></div>
      </div>
    </>
  );
};

export default Controls;