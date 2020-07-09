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
        return [{'_id': "1", "title": "test"}, {'_id': "2", "title": "test2"}]
        // return axios({
        //     method: 'GET',
        //     url: `${this.URI}/requestNew`,
        //     data: {},
        //     withCredentials: true
        // })
    }

    removeSongRequest() {
        return axios({
            method: 'DELETE',
            url: `${this.URI}/wantedSongs/`
        })
    }
}

export default SongService