import React, { Component } from 'react';
import { connect } from 'react-redux';

class DisplayAlertPage extends Component {
    render = () => {
        const {type, message, messageList} = this.props;

        return (
            <div id="alert-page">
                {message &&
                    <div className={type}>
                        {message}
                    </div>}
                {messageList &&
                    <div className={type}>
                        <ul>
                            <h2>Oops</h2>
                            {messageList.map((elem) =>
                                <li>{elem}</li>
                            )}
                        </ul>
                    </div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { type, message, messageList } = state.alertReducer
    return {
        type,
        message,
        messageList
    }
}

const connectedDisplayAlertPage = connect(mapStateToProps)(DisplayAlertPage);
export { connectedDisplayAlertPage as DisplayAlertPage };