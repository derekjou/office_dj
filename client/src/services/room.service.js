const { default: axios } = require("axios");

class RoomService {
  constructor() {
    this.URI = "http://localhost:5000";
  }

  getRoom(id) {
    let uri = `${this.URI}/rooms/room/${id}`;
    return axios.get(uri, { withCredentials: true });
  }

  getUserRooms(username) {
    let uri = `${this.URI}/rooms/myrooms/${username}`;
    return axios.get(uri, { withCredentials: true });
  }

  getUsersRooms(username) {
    let uri = `${this.URI}/rooms/userRooms/${username}`;
    return axios.get(uri, { withCredentials: true });
  }

  getDJRooms(username) {
    let uri = `${this.URI}/rooms/djRooms/${username}`;
    return axios.get(uri, { withCredentials: true });
  }

  getPlaylist(id) {
    let uri = `${this.URI}/rooms/myrooms/playlist/${id}`;
    return axios.get(uri, { withCredentials: true });
  }

  removePlaylistSong(id) {
    let uri = `${this.URI}/rooms/myrooms/playlist/${id}`;
    return axios.delete(uri, { withCredentials: true });
  }

  updateTimestamp(id, timeStamp) {
    let uri = `${this.URI}/rooms/myrooms/playlist/${id}`;
    return axios.put(uri, { timeStamp }, { withCredentials: true });
  }

  createRoom(room) {
    let uri = `${this.URI}/rooms/${room.name}`;
    return axios.post(uri, room, {
      withCredentials: true,
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    });
  }

  findRooms(query) {
    let uri = `${this.URI}/rooms/search?query=${query}`;
    return axios.get(uri, {
      withCredentials: true,
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    });
  }

  sendJoinRequest(name, owner, username) {
    let body = {
      name: name,
      owner: owner,
      username: username,
    };
    console.log(body);
    let uri = `${this.URI}/rooms/${name}/join`;
    return axios.post(uri, body, { withCredentials: true });
  }

  getJoinRequests(name) {
    let uri = `${this.URI}/rooms/${name}/join`;
    return axios.get(uri, { withCredentials: true });
  }

  approveJoinRequest(name, owner, username) {
    let body = {
      name: name,
      owner: owner,
      username: username,
    };
    let uri = `${this.URI}/rooms/${name}/join/${username}`;
    return axios.post(uri, body, { withCredentials: true });
  }
  
  rejectJoinRequest(name, owner, username) {
    let uri = `${this.URI}/rooms/${name}/join/${username}`;
    axios({
      method: "delete",
      url: uri,
      data: {
        name: name,
        owner: owner,
        username: username,
      },
    });
  }

  sendAddRequest(roomId, songId) {
    let body = {
      room_id: roomId,
      song_id: songId,
    };
    console.log(body);
    let uri = `${this.URI}/rooms/myrooms/playlist/${roomId}/request/${songId}`;
    return axios.post(uri, body, { withCredentials: true });
  }

  getSongRequests(roomId) {
      let uri = `${this.URI}/rooms/myroom/playlist/requests?query=${roomId}`;
      return axios.get(uri, { withCredentials: true });
  }

  approveSongRequest(roomId, songId) {
    let uri = `${this.URI}/rooms/myrooms/playlist/${roomId}/request/${songId}`;
    return axios.put(uri, { withCredentials: true });
  }

  rejectSongRequest(roomId, songId) {
    let uri = `${this.URI}/rooms/myrooms/playlist/${roomId}/request/${songId}`;
    return axios({
      method: "delete",
      url: uri,
      data: {
        room_id: roomId,
        song_id: songId,
      },
    });
  }

  getSongHistory(roomId, songId) {
    let uri = `${this.URI}/rooms/myrooms/playlist/${roomId}/history/${songId}`;
    return axios.get(uri, { withCredentials: true });
  }
}

export default RoomService;
