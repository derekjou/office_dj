import { createStore } from "redux";

const initialState = {
  user: {},
  username: "",
  password: "",
  updateUsername: "",
  updatePassword: "",
  updateDpt: "",
  updateFuncTeam: "",
  updateTitle: "",
  NewUser: "",
  newUsername: "",
  newPassword: "",
  newDpt: "",
  newFuncTeam: "",
  newTitle: "",
  roomName: "",
  particpiants: [],
};

function reducer(state = initialState, action) {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case "login":
      return Object.assign({}, state, { username: "", password: "", user: action.user });
    case "logout":
      return Object.assign({}, state, {  user: {} });
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
    case "createRoom":
      return Object.assign({}, state, { NewUser: action.user });
    default:
      return state;
  }
}

export default createStore(reducer);
