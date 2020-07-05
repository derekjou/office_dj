import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserService from '../../services/user.service';
import './RegisterUser.css';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
const axios = require('axios');

const RegisterUser = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const userService = new UserService();

    const newUser = async () => {
        await userService.newUser(state.newUsername, state.newPassword, state.newDpt, state.newFuncTeam, state.newTitle)
        history.push('/')
    }


    return (
        <>
            <div className="register">
                <h1 className="title">New USER INFO</h1>
                <br></br>
                <Form>
                    <Form.Group controlId='username'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Enter username"
                            value={state.newUsername}
                            onChange={e => dispatch({type: "handleNewUsername", newUsername: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter password"
                            value={state.newPassword}
                            onChange={e => dispatch({type: "handleNewPassword", newPassword: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='department'>
                        <Form.Label>Department:</Form.Label>
                        <Form.Control type="text" name="department" placeholder="Enter department"
                            value={state.newDpt}
                            onChange={e => dispatch({type: "handleNewDepartment", newDpt: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='functional_team'>
                        <Form.Label>Functional Team:</Form.Label>
                        <Form.Control type="text" name="functional_team" placeholder="Enter functional team"
                            value={state.newFuncTeam}
                            onChange={e => dispatch({type: "handleNewFuncTeam", newFuncTeam: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='title'>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Enter title"
                            value={state.newTitle}
                            onChange={e => dispatch({type: "handleNewTitle", newTitle: e.target.value})} />
                    </Form.Group>
                    <Button block onClick={newUser}>Register</Button>
                </Form>
            </div>
        </>
    )
    
}

export default RegisterUser;
