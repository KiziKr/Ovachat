import {authService} from '../services'
import {authConstant} from '../constants'

export const authAction = {
    login
}
/**
 * 
 */
function login(username, password) {
    return async dispatch => {
        try {
            const login = await authService.login(username, password)
  
            dispatch({
                type: authConstant.LOGIN_SUCCESS, 
                payload: login
            })
        } catch (err) {
            dispatch({
                type: authConstant.LOGIN_FAILURE,
                payload: {
                    code: 735,
                    errors: err,
                }
            })
        }
    }
}