import { roomListConstant } from '../constants'

const initialState = {rooms: []}

export function roomReducer(state = initialState, action) {
    switch(action.type) {
        case roomListConstant.ADD_SUCCESS:
            return {
                ...state,
                rooms: [...state.rooms, action.payload]
            }
        case roomListConstant.ADD_FAILURE:
        return state

        case roomListConstant.REMOVE_SUCCESS:
        return {
            ...state,
            rooms: state.rooms.filter(room => room !== action.payload)
        }

        case roomListConstant.REMOVE_FAILURE:
        return state
    }
}