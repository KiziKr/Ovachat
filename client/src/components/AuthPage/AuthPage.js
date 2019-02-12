import React, { Component } from 'react';
import { RegisterPage, LoginPage }  from './'

class AuthPage extends Component {
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
                    <div><LoginPage/>
                        <a href="#" onClick={(e) => {
                            this.setState({ login: false })}}>
                            Pas encore inscrit ?
                        </a>
                    </div>:
                    <div><RegisterPage/>
                    <a href="#" onClick={(e) => {
                        this.setState({ login : true })}}>
                        Déjà inscrit ?
                    </a>
                </div>}
            </div>
        )
    }
}

export default AuthPage