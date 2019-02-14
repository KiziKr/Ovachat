import React, { Component } from 'react'
import { Form, Input, Icon, Button } from 'antd'
import './index.css'

class RegisterPage extends Component {
    render = () => {
        return(
            <div>
                <h3>S'inscrire</h3>
                <Form className="auth-form" onSubmit={this.handleSubmit}>
                    <Form.Item className="auth-item">
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Pseudo" />
                    </Form.Item>
                    <Form.Item className="auth-item">
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe" />
                    </Form.Item>
                    <Form.Item className="auth-item">
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirmation" />
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