import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api'

var config = { 
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
async function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        config.headers['authorization'] = 'Bearer ' + user.token
        var res = await axios.post('users/verify',
            null,
            config)

        if(res.data) {
            return user   
        }

        logout()
    }

    return null
}

/**
 * 
 */
async function login(username, password) {
    var user = await axios.post('/users/login', {
        username: username,
        password: password
    }, 
    config)

    if(user.data) {
        localStorage.setItem('user', JSON.stringify(user.data.data))
        await authHeader()
    }

    return user
}

/**
 * 
 */
function logout() {
    localStorage.removeItem('user');
    delete config.headers.authorization
}

/**
 * 
 */
async function register() {
    return await axios.post('/users/post', null, config)
}