import React, { Component } from 'react';
import Login  from './Login'
import Registry  from './Registry'

class AuthUser extends Component {
    constructor() {
        super()

        this.state = {
            login : true
        }
    }

    render() {
        return(
            <div>
                {(this.state.login) ? <Login/> : <Registry/>}
            </div>
        )
    }
}

export default AuthUser;
