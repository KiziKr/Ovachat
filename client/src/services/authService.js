import myaxios from '../myaxios'

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
        myaxios.defaults.config.headers['authorization'] = 'Bearer ' + user.token
        var res = await myaxios.post('users/verify',
            null,
            myaxios.defaults.config)

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
    var user = await myaxios.post('/users/login', {
        username: username,
        password: password
    }, 
    myaxios.defaults.config)

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
    delete myaxios.defaults.config.headers.authorization
}

/**
 * 
 */
async function register(data) {
    return await myaxios.post('/users/register',
        data,
        myaxios.defaults.config
    )
}