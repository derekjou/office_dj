const { default: axios } = require('axios')

class RoomService {
    constructor() {
        this.URI = 'http://localhost:5000/rooms';
    }

    getRoom(room) {
        uri = `${this.URI}/${room.name}?${room.id}`
        return axios.get(uri, { withCredentials: true })
    }

    getUserRooms(user) {
        // TODO
    }

    getParticipants() {
        // TODO
    }

    createRoom(room) {
        uri = `${this.URI}/${room.name}`
        return axios.post(uri, room, { withCredentials: true })
    }
}

export default RoomService;