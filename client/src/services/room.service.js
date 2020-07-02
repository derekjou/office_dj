const { default: axios } = require('axios')

class RoomService {
    constructor() {
        this.URI = 'http://localhost:5000/rooms';
    }

    getRoom(room) {
        let uri = `${this.URI}/${room.name}?${room.id}`
        return axios.get(uri, { withCredentials: true })
    }

    getUserRooms(user) {
        // TODO
    }

    getParticipants() {
        // TODO
    }

    createRoom(roomName, participants) {
        let uri = `${this.URI}/${roomName}`
        return axios.post(uri, { roomName, participants }, { withCredentials: true })
    }
}

export default RoomService;