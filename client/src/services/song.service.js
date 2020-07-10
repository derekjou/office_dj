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
}

export default SongService