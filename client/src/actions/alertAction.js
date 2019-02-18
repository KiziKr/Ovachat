import {alertConstant} from '../constants'

/**
 * 
 */
export const alertAction = {
    success,
    error,
    errorTab,
    clear
}


/**
 * 
 */
function success(message) {
    return {
        type: alertConstant.SUCCESS,
        payload: message
    }
}

/**
 * 
 */
function error(message) {
    return {
        type: alertConstant.ERROR,
        payload: message
    }
}

/**
 * 
 */
function errorTab(tab) {
    return {
        type: alertConstant.ERRORS_TAB,
        payload: tab
    }
}

/**
 * 
 */
function clear() {
    return {
        type: alertConstant.CLEAR
    }
}