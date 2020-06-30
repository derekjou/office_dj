const { default: axios } = require('axios')

class RoomService {
    constructor() {
        this.URI = 'http://localhost:5000/rooms';
    }

    createRoom() {
        return axios.get(this.URI, { withCredentials: true })
    }
}

export default UserService;