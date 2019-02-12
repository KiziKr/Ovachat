import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd'
import { connect } from 'react-redux';
import {authAction} from '../../actions/authAction'

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            submitted: false
        }
    }

    componentDidMount = () => {
        
        (async () => {
            try {
                //this.props.dispatch(await authAction.login("KiziKr", "0000"))
            } catch (e) {
                console.log(e)
            }
        })()    
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render = () => {
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

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 