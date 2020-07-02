import { createStore } from "redux";

const initialState = {
  username: "",
  password: "",
  updateUsername: "",
  updatePassword: "",
  updateDpt: "",
  updateFuncTeam: "",
  updateTitle: "",
};

function reducer(state = initialState, action) {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case "login":
      return Object.assign({}, state, { username: "", password: "" });
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
    default:
      return state;
  }
}

export default createStore(reducer);
