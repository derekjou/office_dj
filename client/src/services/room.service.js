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

    sendJoinRequest(name, owner, username) {
        let body = {
            'name': name,
            'owner': owner,
            'username': username
        }
        console.log(body)
        let uri = `${this.URI}/rooms/${name}/join`;
        return axios.post(uri, body, {withCredentials: true})
    }

    getJoinRequests(name) {
        let uri = `${this.URI}/rooms/${name}/join`;
        return axios.get(uri, {withCredentials: true})
    }

    approveJoinRequest(name, owner, username) {
        let body = {
            'name': name,
            'owner': owner,
            'username': username
        }
        let uri = `${this.URI}/rooms/${name}/join/${username}`;
        return axios.post(uri, body, { withCredentials: true })
    }

    rejectJoinRequest(name, owner, username) {
        let uri = `${this.URI}/rooms/${name}/join/${username}`;
        axios({
            method: 'delete',
            url: uri,
            data: {
                'name': name,
                'owner': owner,
                'username': username
            }
        });
    }
}

export default RoomService;