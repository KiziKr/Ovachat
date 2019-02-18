import {authService} from '../services'
import {authConstant} from '../constants'
import {alertAction} from './alertAction'

export const authAction = {
    autoLogin,
    login,
    logout,
    register
}

/**
 * 
 */
async function autoLogin() {
    const user = await authService.authHeader()
   
    if(user) {
        return {
            type: authConstant.LOGIN_SUCCESS, 
            payload: ""
        }
     } else {
        return {
            type: authConstant.LOGIN_FAILURE,
            payload: "echec"
        }
    }
}

function login(username, password) {
    return async dispatch => {
        const auth = await authService.login(username, password).catch(err=> JSON.parse(err.response.request.response))

        if(auth.success === true) {
            dispatch({type: authConstant.LOGIN_SUCCESS})
        }
        
        if(auth.success === false){
            dispatch({type: authConstant.LOGIN_FAILURE})
            dispatch(alertAction.error(auth.data.errmsg))
        }
    }
}


async function logout() {
    authService.logout()
    return {type: authConstant.LOGOUT}
}

/**
 * 
 */
async function register(user) {
    const res = await authService.register(user)
}