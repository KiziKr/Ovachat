import { combineReducers } from 'redux';
import {authReducer} from './authReducer'
import {alertReducer} from './alertReducer'

export const rootReducer = combineReducers({
    authReducer,
    alertReducer
})