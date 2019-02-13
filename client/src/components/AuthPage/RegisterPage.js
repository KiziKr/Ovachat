import React, { Component } from 'react'
import { Form, Input, Icon, Button } from 'antd'

class RegisterPage extends Component {
    render = () => {
        return(
            <div>
                <h3>S'inscrire</h3>
                <Form className="auth-form" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm password" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign in
                    </Button>
                </Form>
            </div>
        )
    }
}

export {RegisterPage}