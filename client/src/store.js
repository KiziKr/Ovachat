import {createStore, applyMiddleware} from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import {rootReducer} from './reducers'
import myaxios from './myaxios'

export const store = createStore(
    rootReducer, //custom reducers
    applyMiddleware(
      //all middlewares
      axiosMiddleware(myaxios)
    )
)