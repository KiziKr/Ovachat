import API from '../myaxios'

export const roomService = {
    find,
    addRoom,
    removeRoom
}

async function find() {
    let rooms = await API.get('/rooms')
    console.log(rooms)
}

async function addRoom(roomName) {
    return await API.get('/rooms/add/' + roomName)
}

function removeRoom(roomName) {
    
}
