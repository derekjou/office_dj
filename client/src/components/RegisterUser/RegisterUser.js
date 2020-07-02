import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import './RegisterUser.css';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
const axios = require('axios');

class NewUser extends Component {


    newUser() {
        let NewUser = axios({
            method: 'POST',
            url: 'http://localhost:5000/users/register',
            data: {
                username: this.props.newUsername,
                password: this.props.newPassword,
                department: this.props.newDpt,
                functional_team: this.props.newFuncTeam,
                title: this.props.newTitle

            }
        })

        this.props.handleNewUser(NewUser);

    }


    render() {
        return (
            <>
                <div className="Register">
                    <h1 className="Title" >New USER INFO</h1>
                    <br></br>
                    <Form>
                        <Form.Group controlId='username'>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" name="username"
                                value={this.props.newUsername}
                                onChange={this.props.handleNewUsernameInput} />
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" name="password"
                                value={this.props.newPassword}
                                onChange={this.props.handleNewPasswordInput} />
                        </Form.Group>
                        <Form.Group controlId='department'>
                            <Form.Label>Department:</Form.Label>
                            <Form.Control type="text" name="department"
                                value={this.props.newDpt}
                                onChange={this.props.handleNewDepartmentInput} />
                        </Form.Group>
                        <Form.Group controlId='functional_team'>
                            <Form.Label>Functional Team:</Form.Label>
                            <Form.Control type="text" name="functional_team"
                                value={this.props.newFuncTeam}
                                onChange={this.props.handleNewFuncTeamInput} />
                        </Form.Group>
                        <Form.Group controlId='title'>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" name="title"
                                value={this.props.newTitle}
                                onChange={this.props.handleNewTitleInput} />
                        </Form.Group>
                        <Button onClick={() => this.newUser()}>Submit</Button>
                    </Form>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { user, newUsername, newPassword, newDpt, newFuncTeam, newTitle } = state;
    return {
        Newuser: user,
        newUsername: newUsername,
        newPassword: newPassword,
        newDpt: newDpt,
        newFuncTeam: newFuncTeam,
        newTitle: newTitle
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleNewUsernameInput: (e) => dispatch({ type: 'handleNewUsername', newUsername: e.target.value }),
        handleNewPasswordInput: (e) => dispatch({ type: 'handleNewPassword', newPassword: e.target.value }),
        handleNewDepartmentInput: (e) => dispatch({ type: 'handleNewDepartment', newDpt: e.target.value }),
        handleNewFuncTeamInput: (e) => dispatch({ type: 'handleNewFuncTeam', newFuncTeam: e.target.value }),
        handleNewTitleInput: (e) => dispatch({ type: 'handleNewTitle', newTitle: e.target.value }),
        handleNewUser: (user) => dispatch({ type: 'Newuser', user: user })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
