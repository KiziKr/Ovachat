import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api'

let config = { 
    headers: {
        'Content-Type': 'application/json'
    }
}

export const authService = {
    authHeader,
    login,
    logout,
    register
}

/**
 * 
 */
function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        config.headers['authorization'] = 'Bearer ' + user.token
        return true
    }

    return false
}

/**
 * 
 */
async function login(username, password) {
    var token = await axios.post('/users/login', {
        username: username,
        password: password
    }, 
    config)

    if(token.data) {
        config.headers['authorization'] = 'Bearer ' + token.data
        return true
    }

    return false
}

function logout() {

}

/**
 * 
 */
async function register() {
    return await axios.post('/users/post', null, config)
}