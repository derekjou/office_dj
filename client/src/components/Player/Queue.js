import React from "react";
import { useSelector } from "react-redux";
import "./Player.scss";
import SongHistory from "../SongHistory/SongHistory.js"

const Queue = (props) => {
  const state = useSelector((state) => state);

  return (
    <div className="queue">
      <table>
        <tr>
          <th>Up Next: </th>
        </tr>
        {state.currentRoom.playlist.playlist ? state.currentRoom.playlist.playlist.map((song, i) => {
          return i !== 0 ? (
            <tr>
              <div className="player">
                <img alt="albumCover" src={song.album_url} />
                <div className="info2">
                  <div className="name">{song.title}</div>
                  <div className="artists">{song.artists.join(", ")}</div>
                  <SongHistory song={song} />
                </div>
              </div>
            </tr>
          ) : null;
        }) : null}
      </table>
    </div>
  );
};

export default Queue;