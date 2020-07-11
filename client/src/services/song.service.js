const { default: axios } = require('axios')

class SongService {
    constructor(){
        this.URI = 'http://localhost:5000/songs';
    }

    requestNewSong(title, genre, artists, url, album) {
        return axios({
            method: 'POST',
            url: `${this.URI}/requestNew`,
            data: {
                title,
                genre,
                artists,
                url,
                album
            },
            withCredentials: true
        })
    }

    getNewSongRequests() {
        return axios({
            method: 'GET',
            url: `${this.URI}/requestNew`,
            withCredentials: true
        })
    }

    removeSongRequest() {
        return axios({
            method: 'DELETE',
            url: `${this.URI}/wantedSongs/`
        })
    }

    approveNewSong(key) {
        console.log(`approving request ${key._id}`)
        return axios({
            method: 'PUT',
            url: `${this.URI}/requestNew/${key._id}`,
            data: {key},
        })
    }

    rejectNewSong(key) {
        console.log(`rejecting request ${key._id}`)
        return axios({
            method: 'DELETE',
            url: `${this.URI}/requestNew/${key._id}`,
            data: {key},
        })
    }

    findSongs(query) {
        let uri = `${this.URI}/songs/search?query=${query}`;
        return axios.get(uri, {
            withCredentials: true, validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        })
    }
}

export default SongService