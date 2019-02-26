import { roomConstant } from '../constants'
import { roomService } from '../../services'

export const roomAction = {
    addRoom,
    removeRoom
}

function addRoom(roomName) {
    // return async dispatch => {
        console.log(await roomService.addRoom(roomName))
    //}
}

function removeRoom(roomName) {
}

