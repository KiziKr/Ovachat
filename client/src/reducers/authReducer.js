import {authConstant} from '../constants'

const initialState = { loggedIn: false }

export function authReducer(state = initialState, action){
    switch(action.type) {
        case authConstant.LOGIN_REQUEST:
            return {
            }
        case authConstant.LOGIN_SUCCESS:
        return { 
            ...state,
            loggedIn: true 
        }
        case authConstant.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        case authConstant.LOGOUT:
        return {
            ...state,
            loggedIn: false
        }
        default:
            return {
                state
            }
    }
}
