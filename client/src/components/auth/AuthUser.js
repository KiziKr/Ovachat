import React, { Component } from 'react';
import Login  from './Login'
import Register from './Register'

class AuthUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login : true
        }
    }

    render = () => {
        return(
            <div>
                {(this.state.login)? 
                    <div>
                        <Login/>
                        <a href="#" onClick={(e) => {
                            this.setState({ login: false })}}>
                            Pas encore inscrit ?
                        </a>
                    </div>:
                    <div>
                    <Register/>
                    <a href="#" onClick={(e) => {
                        this.setState({ login : true })}}>
                        Déjà inscrit ?
                    </a>
                </div>}
            </div>
        )
    }
}

export default AuthUser;
