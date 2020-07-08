const { default: axios } = require('axios')

class SongService {
    constructor(){
        this.URI = 'http://localhost:5000/songs';
    }

    requestNewSong(songName, genre, artist, url, album) {
        return axios({
            method: 'POST',
            url: `${this.URI}/requestNew`,
            data: {
                songName,
                genre,
                artist,
                url,
                album
            },
            withCredentials: true
        })
    }
}

export default SongService