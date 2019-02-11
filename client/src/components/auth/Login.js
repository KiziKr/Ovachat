import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd'
import { login, create } from '../../axios'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            login : false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        (async () => {
            try {
                this.setState({
                    login : await login("KiziKr", "0000")
                })
            } catch (e) {
            }
        })();
    }

    render() {
        return(
            <div id="auth-login">
                <div className="wrapper-errors">
                    <ul className="list-errors">
                        {/* {this.state.errors.map((error, key) => {
                            <li key={key}>{error}</li>    
                        })} */}
                    </ul>
                </div>
                <h3>Login</h3>
                <Form className="auth-form" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <Button type="primary" onClick={(e) => {
                           (async () => {
                            try {
                                console.log(await create())
                            } catch (e) {
                            }
                        })();
                    }}>
                        Post
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Login;
