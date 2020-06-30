import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import './Login.module.css';
import UserService from '../../services/user.service'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Dashboard from './dashboard.component';
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

    login() {
        console.log(this.props)
        this.userService.login(this.props.username,
            this.props.password).then(
                (resp) => {
                    this.props.dispatch({ type: 'login', user: resp.data });
                    // <Redirect to={{pathname:'/dashboard'}}/>
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
            <Form>
                    <Form.Group controlId='username'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter username"
                            value={this.props.username}
                            onChange={this.props.handleUserInput} 
                            onKeyDown={(e) => this.handleKeyDown(e)}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter password"
                            value={this.props.password}
                            onChange={this.props.handlePasswordInput} 
                            onKeyDown={(e) => this.handleKeyDown(e)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.login}>
                        Submit
                    </Button>
                </Form>
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
        if (this.props.user) {
            return this.displayUser()
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
        handleUserInput: (e) => dispatch({type: 'handleUsername', username: e.target.value}),
        handlePasswordInput: (e) => dispatch({type: 'handlePassword', password: e.target.value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);