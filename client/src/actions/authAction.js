import {authService} from '../services'
import {authConstant} from '../constants'

export const authAction = {
    login
}
/**
 * 
 */
async function login(username, password) {
    const res = await authService.login(username, password)

    if(res === true) {
        return {
            type: authConstant.LOGIN_SUCCESS, 
            payload: login
        }
    }else {
        return {
            type: authConstant.LOGIN_FAILURE,
            payload: {
                code: 735,
                errors: "Authentification failed",
            }
        }
    }
}