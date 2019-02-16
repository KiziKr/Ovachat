import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RegisterPage, LoginPage }  from './'
import './index.css'

class AuthPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login : true
        }
    }

    render = () => {
        return(
            <div id="auth-page">
                {this.props.message &&
                    <div className="error">{this.props.message}</div>}
                {(this.state.login)? 
                    <div><LoginPage/>
                        <a href="#" className="auth-lien" onClick={(e) => {
                            this.setState({ login: false })}}>
                            Pas encore inscrit ?
                        </a>
                    </div>:
                    <div><RegisterPage/>
                    <a href="#" className="auth-lien" onClick={(e) => {
                        this.setState({ login : true })}}>
                        Déjà inscrit ?
                    </a>
                </div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { type, message} = state.alertReducer
    return {
        type,
        message
    }
}
  
const connectedAuthPage = connect(mapStateToProps)(AuthPage);
export { connectedAuthPage as AuthPage }; 