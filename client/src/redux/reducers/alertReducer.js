import {alertConstant} from '../constants'

export function alertReducer(state = {type:'', message:'', messageList:[]}, action) {
    switch(action.type) {
        case alertConstant.SUCCESS:
            return {
                ...state,
                type: 'alert-success',
                message: action.payload
            }
        case alertConstant.ERROR:
            return {
                ...state,
                type: 'alert-error',
                message: action.payload
            }
        case alertConstant.ERRORS_TAB:
            return {
                ...state,
                type: 'alert-error',
                messageList: action.payload
            }
        case alertConstant.CLEAR:
            return {}
        default:
            return state
    }
}