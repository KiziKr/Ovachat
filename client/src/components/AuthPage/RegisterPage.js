import React, { Component } from 'react'
import { Form, Input, Icon, Button } from 'antd'
import {authAction} from '../../actions/authAction'
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

    handleSubmit = (event) => {
        event.preventDefault();

        const { user, confirmPassword } = this.state

        this.setState({
            submitted: true
        })

        if(user.username && user.password) {
            if(user.password === confirmPassword) {
                return authAction.register(user)
            }

            console.log("eee")
        }
    }
    
    render = () => {
        return(
            <div>
                <h3>S'inscrire</h3>
                <Form className="auth-form" onSubmit={this.handleSubmit}>
                    <Form.Item className="auth-item">
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Pseudo" onChange={(e) => {
                            // this.state.user.username = e.target.value
                            // this.setState({
                            //     user: this.state.user
                            // })
                        }} />
                    </Form.Item>
                    <Form.Item className="auth-item">
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe" onChange={(e) => {
                            // this.state.user.password = e.target.value
                            // this.setState({
                            //     user: this.state.user
                            // })
                        }} />
                    </Form.Item>
                    <Form.Item className="auth-item">
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirmation" onChange={(e) => {
                            this.setState({
                                confirmPassword: e.target.value
                            })
                        }}/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Valider
                    </Button>
                </Form>
            </div>
        )
    }
}

export {RegisterPage}