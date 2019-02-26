import React, { Component } from 'react'
import { connect } from 'react-redux'

class RoomList extends Component {
    render = () => {
        return(
            <div id="room-list">
                <h2>Channels</h2>
                <ul>

                </ul>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const {  } = state.
    return {
    };
}

const connectedRoomList = connect(mapStateToProps)(RoomList);
export { connectedRoomList as RoomList };