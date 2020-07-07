const { default: axios } = require('axios')

class RoomService {
    constructor() {
        this.URI = 'http://localhost:5000';
    }

    getRoom(room) {
        let uri = `${this.URI}/rooms/${room.name}?${room.id}`
        return axios.get(uri, { withCredentials: true })
    }

    getUserRooms(username) {
        let uri = `${this.URI}/rooms/myrooms/${username}`
        return axios.get(uri, { withCredentials: true })
    }

    getParticipants() {
        // TODO
    }

    createRoom(room) {
        let uri = `${this.URI}/rooms/${room.name}`;
        return axios.post(uri, room, {
            withCredentials: true, validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            } 
        })
    }
    findRooms(query) {
        let uri = `${this.URI}/rooms/search?query=${query}`;
        return axios.get(uri, {
            withCredentials: true, validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        })
    }
}

export default RoomService;