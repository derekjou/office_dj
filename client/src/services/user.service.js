const { default: axios } = require('axios')

class UserService {
    constructor(){
        this.URI = 'http://localhost:5000/users';
    }

    checkLogin() {
        return axios.get(this.URI, {withCredentials: true})
    }
    login(username, password) {
        return axios.post(this.URI, 'user='+username+'&password='+password, {withCredentials: true})
    }
    logout() {
        return axios.delete(this.URI, {withCredentials: true})
    }
}

export default UserService;