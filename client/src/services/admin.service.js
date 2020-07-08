const { default: axios } = require('axios')

class AdminService {
    constructor(){
        this.URI = 'http://localhost:5000/admin';
    }

    login(username, password) {
        return axios({
            method: 'POST',
            url: `${this.URI}/login`,
            data: {
                username: username, 
                password: password, 
            },
            withCredentials: true
        })
    }

    changeRole(username) {
        return axios({
            method: 'PUT',
            url: `${this.URI}/changerole`,
            data: {
                username: username
            },
            withCredentials: true
        })
    }

    newSong(title, artists, album, genre, url) {
        return axios({
            method: 'POST',
            url: `${this.URI}/addSong`,
            data: {
                title: title,
                artists: artists,
                album: album,
                genre: genre,
                url: url
            },
            withCredentials: true
        })
    }
    
}

export default AdminService;