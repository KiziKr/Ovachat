import {authService} from '../services'
import {authConstant} from '../constants'

export const authAction = {
    autoLogin,
    login,
    logout
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

/**
 * 
 */
async function login(username, password) {
    const res = await authService.login(username, password)

    if(res.data) {
        return {
            type: authConstant.LOGIN_SUCCESS, 
            payload: res.data.successmsg
        }
    }else {
        return {
            type: authConstant.LOGIN_FAILURE,
            payload: res.error
        }
    }
}

async function logout() {
    authService.logout()
    return {type: authConstant.LOGOUT}
}