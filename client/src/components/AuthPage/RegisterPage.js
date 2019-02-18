import React, { Component } from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { connect } from 'react-redux';
import {authAction} from '../../actions/authAction'
import {alertAction} from '../../actions/alertAction'
import './index.css'

class RegisterPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: '',
                password: '',
            },

            confirmPassword: '',
            submitted: false
        }
    }

    componentDidMount() {
        (async () => {
            this.props.dispatch(alertAction.clear())
        })()
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { user, confirmPassword } = this.state

        this.setState({
            submitted: true
        })

        if(user.username && user.password) {
            if(user.password === confirmPassword) {
                this.props.dispatch(authAction.register(user))
            }
        }
    }
    
    render = () => {
        const {submitted, user, confirmPassword} = this.state

        return(
            <div>
                <h3>S'inscrire</h3>
                <Form className="auth-form" onSubmit={this.handleSubmit}>
                    <Form.Item className="auth-item">
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Pseudo" onChange={(e) => {
                            this.state.user.username = e.target.value
                            this.setState({
                                user: this.state.user
                            })
                        }} />
                    </Form.Item>
                    {submitted && !user.username &&
                        <div className="text-danger">Pseudo requis</div>
                    }
                    <Form.Item className="auth-item">
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe" onChange={(e) => {
                            this.state.user.password = e.target.value
                            this.setState({
                                user: this.state.user
                            })
                        }} />
                    </Form.Item>
                    {submitted && !user.password &&
                        <div className="text-danger">Mot de passe requis</div>
                    }
                    <Form.Item className="auth-item">
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirmation" onChange={(e) => {
                            this.setState({
                                confirmPassword: e.target.value
                            })
                        }}/>
                    </Form.Item>
                    {submitted && !confirmPassword &&
                        <div className="text-danger">Confirmation du mot de passe requise</div>
                    }
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Valider
                    </Button>
                </Form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { loggedIn } = state.authReducer
    return {
        loggedIn
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage }; 