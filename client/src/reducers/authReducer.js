import {authConstant} from '../constants'

export const authReducer = (state = {
    logged : false
}, action) => {
    switch(action.type) {
        case authConstant.LOGIN_REQUEST:
            return {
                
            }
        case authConstant.LOGIN_SUCCESS:
            return {

            }
        case authConstant.LOGIN_FAILURE:
            return {
                error: action.error
            } 
    }
    return state
}

//export default authReducer