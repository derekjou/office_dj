import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  user: {},
  username: "",
  password: "",
  updateUsername: "",
  updatePassword: "",
  updateDpt: "",
  updateFuncTeam: "",
  updateTitle: "",
  newUsername: "",
  newPassword: "",
  newDpt: "",
  newFuncTeam: "",
  newTitle: "",
  room: { name: "", owner: "", participants: "", playlists: "", date_created: "" },
  myRooms: [],
  currentRoom: { name: "", owner: "", participants: "", playlist: {}, date_created: "" },
  newRoomName: "",
  newParticipant: "",
  roomName: "",
  participants: {},
  roomSearchQuery: '',
  roomSearchList: [],
  requestRoom: { name: "", owner: "" },
  title: "",
  artists: [],
  album: "",
  genre: "",
  url: "",
  currentSong: { _id: "", title: "", album: "", artists: [], genre: "", url: "", album_url: "" }
};

function reducer(state = initialState, action) {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case "login":
      return Object.assign({}, state, { username: "", password: "", user: action.user });
    case "logout":
      return Object.assign({}, state, {  user: {} });
    case "updateUser":
      return Object.assign({}, state, {  user: action.user });
    case "handleUsername":
      return Object.assign({}, state, { username: action.username });
    case "handlePassword":
      return Object.assign({}, state, { password: action.password });
    case "handleUpdateUsername":
      return Object.assign({}, state, { updateUsername: action.updateUsername});
    case "handleUpdatePassword":
      return Object.assign({}, state, { updatePassword: action.updatePassword});
    case "handleUpdateDepartment":
      return Object.assign({}, state, { updateDpt: action.updateDpt});
    case "handleUpdateFuncTeam":
      return Object.assign({}, state, { updateFuncTeam: action.updateFuncTeam});
    case "handleUpdateTitle":
      return Object.assign({}, state, { updateTitle: action.updateTitle});
    case "handleNewUsername":
      return Object.assign({}, state, { newUsername: action.newUsername});
    case "handleNewPassword":
      return Object.assign({}, state, { newPassword: action.newPassword});
    case "handleNewDepartment":
      return Object.assign({}, state, { newDpt: action.newDpt});
    case "handleNewFuncTeam":
      return Object.assign({}, state, { newFuncTeam: action.newFuncTeam});
    case "handleNewTitle":
      return Object.assign({}, state, { newTitle: action.newTitle});
    case "NewUser":
      return Object.assign({}, state, { NewUser: action.user});
    case "handleNewRoomName":
      return Object.assign({}, state, { newRoomName: action.newRoomName });
    case "handleNewParticipant":
      return Object.assign({}, state, { newParticipant: action.newParticipant });
    case "room":
      return Object.assign({}, state, { room: action.room });
    case "handleMyRooms":
      return Object.assign({}, state, { myRooms: action.myRooms });
    case "handleCurrentRoom":
      return Object.assign({}, state, { currentRoom: action.currentRoom });
    case "handleRoomSearchQuery":
      return Object.assign({}, state, { roomSearchQuery: action.roomSearchQuery });
    case "handleRoomSearch":
      return Object.assign({}, state, { roomSearchList: action.roomSearchList });
    case "handleRoomRequestSuccess":
      return Object.assign({}, state, { requestRoom: action.requestRoom })
    case "handleTitleInput":
      return Object.assign({}, state, { title: action.title});
    case "handleArtistsInput":
      return Object.assign({}, state, { artists: action.artists.split(", ")});
    case "handleAlbumInput":
      return Object.assign({}, state, { album: action.album});
    case "handleGenreInput":
      return Object.assign({}, state, { genre: action.genre});
    case "handleURLInput":
      return Object.assign({}, state, { url: action.url});
    case "setCurrentSong":
      let ret = Object.assign({}, state, { currentSong: action.currentSong })
      console.log('new state:', ret);
      return ret;
    default:
      return state;
  }
}

export default createStore(reducer, composeWithDevTools());
