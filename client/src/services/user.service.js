const { default: axios } = require('axios')

class UserService {
    constructor(){
        this.URI = 'http://localhost:5000/users';
    }

    login(username, password) {
        return axios({
            method: 'POST',
            url: `${this.URI}/login`,
            data: {
                username, 
                password
            },
            withCredentials: true
        })
    }

    newUser(username, password, department, functional_team, title) {
        return axios({
            method: 'POST',
            url: `${this.URI}/register`,
            data: {
                username,
                password,
                department,
                functional_team,
                title
            }
        })
    }

    updateUser(oldUsername, username, password, department, functional_team, title) {
        return axios({
            method: 'PUT',
            url: `${this.URI}/updateUser/${oldUsername}`,
            data: {
                username, 
                password, 
                department, 
                functional_team, 
                title
            },
            withCredentials: true
        })
    }
}

export default UserService;