import API from '../myaxios'

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
        API.defaults.config.headers['authorization'] = 'Bearer ' + user.token
        var res = await API.post('users/verify',
            null,
            API.defaults.config)

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
    var user = await API.post('/users/login', {
        username: username,
        password: password
    },
    API.defaults.config)

    if(user.data.success === true) {
        localStorage.setItem('user', JSON.stringify(user.data.data))
        await authHeader()
    }

    return user.data
}

/**
 * 
 */
function logout() {
    localStorage.removeItem('user');
    delete API.defaults.config.headers.authorization
}

/**
 * 
 */
async function register(data) {
    return await API.post('/users/register',
        data,
        API.defaults.config
    )
}