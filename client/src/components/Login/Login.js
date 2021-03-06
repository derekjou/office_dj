import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UserService from '../../services/user.service';

const Login = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const userService = new UserService();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    }

    const login = async () => {
        let loggedUser = await userService.login(state.username, state.password)
        sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser.data));
        dispatch({ type: 'login', user: loggedUser.data })
        history.push('/')
    }

    return (
        <div className="login">
            <h1 className="title" >Log in</h1>
            <br></br>
            <Form>
                <Form.Group controlId='username'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                        autoFocus
                        value={state.username}
                        onChange={e => dispatch({ type: 'handleUsername', username: e.target.value })}
                        onKeyDown={(e) => handleKeyDown(e)} />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                        value={state.password}
                        onChange={e => dispatch({ type: 'handlePassword', password: e.target.value })}
                        onKeyDown={(e) => handleKeyDown(e)} />
                </Form.Group>
                <Button block type="submit" onClick={e => {
                    e.preventDefault()
                    login()}}>
                    Log In
            </Button>
            </Form>
        </div>
    )
}

export default Login;