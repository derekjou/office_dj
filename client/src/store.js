import { createStore } from 'redux';

const initialState = {
    user: null,
    username: '',
    password: '',
};

function DJReducer(state = initialState, action) {
    console.log(state);
    console.log(action);
    switch(action.type) {
        case 'login':
            return Object.assign({}, state, {username: '', user: action.user},
                                 {password: '', password: action.password})
        case 'handleUsername':
            return Object.assign({}, state, {username: action.username})
        case 'handlePassword':
            return Object.assign({}, state, {password: action.password})
        default:
            return state;
    }
}

let store = createStore(DJReducer);

export default store;