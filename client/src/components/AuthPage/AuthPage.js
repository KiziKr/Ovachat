import React, { Component } from 'react';
import { RegisterPage, LoginPage } from './'
import {DisplayAlertPage} from '../AlertPage/DisplayAlertPage'
import './index.css'

class AuthPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login: true
        }
    }

    render = () => {
        return (
            <div id="auth-page">
                <DisplayAlertPage/>
                {(this.state.login) ?
                    <div><LoginPage />
                        <a href="#" className="auth-lien" onClick={(e) => {
                            this.setState({ login: false })
                        }}>
                            Pas encore inscrit ?
                        </a>
                    </div> :
                    <div><RegisterPage />
                        <a href="#" className="auth-lien" onClick={(e) => {
                            this.setState({ login: true })
                        }}>
                            Déjà inscrit ?
                    </a>
                    </div>}
            </div>
        )
    }
}

export default AuthPage