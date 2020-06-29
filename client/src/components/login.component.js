import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import './login.component.css';
import UserService from '../services/user.service'
import Dashboard from './dashboard.component';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
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
                    this.props.dispatch({ type: 'login', user: resp.data })
                    <Redirect to={{pathname:'/dashboard'}}/>
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

    handleInput(e) {
        console.log(this.props)
        this.props.dispatch({ type: 'handleUsername', username: e.target.value },
            { type: 'handlePassword', password: e.target.value })
    }

    getLoginForm() {
        return (
            <>
                <div className='login-dark'>
                    <form method='post'>
                        <h2 className='sr-only'>Login Form</h2>
                        <div className='ilustration'>
                            <i className='icon ion-ios-locked-outline'></i>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" name="username" placeholder="Username"
                                value={this.props.username}
                                onChange={this.handleInput} />
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="password" name="password" placeholder="Password"
                                value={this.props.username}
                                onChange={this.handleInput}
                                onKeyDown={(e) => this.handleKeyDown(e)} />
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary btn-block" type="submit"
                                onClick={this.login}>Log In</button>
                        </div>
                    </form>
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

export default connect(mapStateToProps)(Login);