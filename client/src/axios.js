import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3001/api"

/**
 * 
 */
var config = {
    headers: {
        "Content-Type": "application/json"
    }
}

/**
 * 
 */
export async function login(username, password) {
    var token = await axios.post('/users/login', {
        username: username,
        password: password
    }, 
    config)

    if(token.data) {
        config.headers['authorization'] = token.data
        return true
    }

    return false
}

/**
 * 
 */
export async function create() {
    return await axios.post('/users/post', null, config)
}