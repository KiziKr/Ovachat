import {myaxios} from '../myaxios'

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
        myaxios.headers['authorization'] = 'Bearer ' + user.token
        return true
    }

    return false
}

/**
 * 
 */
async function login(username, password) {
    var token = await myaxios.post('/users/login', {
        username: username,
        password: password
    }, 
    myaxios.headers)

    if(token.data) {
        myaxios.headers['authorization'] = 'Bearer ' + token.data
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
    return await myaxios.post('/users/post', null, myaxios.headers)
}