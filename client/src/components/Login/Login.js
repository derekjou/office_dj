import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import './Login.module.css';
import UserService from '../../services/user.service'
import { Button, Form } from "react-bootstrap";
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    userService = new UserService();

    componentDidMount() {
        this.userService.checkLogin().then(
            (resp) => {
                this.props.dispatch({ type: 'login', user: resp.data })
            }
        )
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.login();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    login() {
        console.log(this.props)
        this.userService.login(this.props.username,
            this.props.password).then(
                (resp) => {
                    this.props.dispatch({ type: 'login', user: resp.data });
                    // TO DO: what will happen after the login is success
                }
            )
    }

    logout() {
        this.userService.logout().then(
            () => {
                console.log('Logging out.')
                this.props.dispatch({ type: 'login', user: null })
            }
        )
    }

    getLoginForm() {
        return (
            <>
                <div className="Login" style={{ width: '30%', height: 'auto', margin: 'auto' }}>
                    <h1 style={{ textAlign: 'center' }}>Log in</h1>
                    <br></br>
                    <Form>
                        <Form.Group controlId='username'>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" placeholder="Enter username"
                                autoFocus
                                value={this.props.username}
                                onChange={this.props.handleUserInput}
                                onKeyDown={(e) => this.handleKeyDown(e)} />
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password"
                                value={this.props.password}
                                onChange={this.props.handlePasswordInput}
                                onKeyDown={(e) => this.handleKeyDown(e)} />
                        </Form.Group>
                        <Button block type="submit" onClick={this.login}>
                            Log In
                    </Button>
                    </Form>
                </div>
            </>
        )
    }

    displayUser() {
        return (
            <>
                <ul className='nav'>
                    <li className='nav-item'>
                        Welcome {this.props.user.role}: {this.props.user.username}
                    </li>
                    <li className='nav-item'><button className='btn btn-danger'
                        onClick={this.logout}>Logout</button></li>
                </ul>
            </>
        )
    }

    render() {
        console.log('rendering login')
        console.log(this.props.user)
        if (this.props.user) {
            // return this.displayUser()
            return this.getLoginForm()
        } else {
            return this.getLoginForm()
        }
    }
}

function mapStateToProps(state) {
    const { user, username, password } = state;
    return {
        user: user,
        username: username,
        password: password
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleUserInput: (e) => dispatch({ type: 'handleUsername', username: e.target.value }),
        handlePasswordInput: (e) => dispatch({ type: 'handlePassword', password: e.target.value })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);