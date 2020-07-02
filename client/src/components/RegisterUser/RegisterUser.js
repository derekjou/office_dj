import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
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
    return <div>
        <p>New USER INFO</p>
            <label>
                Username
                <input className="form-control" type="text" name="username"
                                    value={this.props.newUsername}
                                    onChange={this.props.handleNewUsernameInput} />
            </label>
            <label for="password">
                Password
                <input className="form-control" type="password" name="password"
                                    value={this.props.newPassword}
                                    onChange={this.props.handleNewPasswordInput} />
            </label>
            <label for="department">
                Department
                <input className="form-control" type="text" name="department"
                                    value={this.props.newDpt}
                                    onChange={this.props.handleNewDepartmentInput} />
            </label>
            <label for="functional_team">
                Functional Team
                <input className="form-control" type="text" name="functional_team"
                                    value={this.props.newFuncTeam}
                                    onChange={this.props.handleNewFuncTeamInput} />
            </label>
            <label for="title">
                Title
                <input className="form-control" type="text" name="title"
                                    value={this.props.newTitle}
                                    onChange={this.props.handleNewTitleInput} />
            </label>
            <Button onClick={() => this.newUser()}>Submit</Button>
        </div>;

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
        handleNewUsernameInput: (e) => dispatch({type: 'handleNewUsername', newUsername: e.target.value}),
        handleNewPasswordInput: (e) => dispatch({type: 'handleNewPassword', newPassword: e.target.value}),
        handleNewDepartmentInput: (e) => dispatch({type: 'handleNewDepartment', newDpt: e.target.value}),
        handleNewFuncTeamInput: (e) => dispatch({type: 'handleNewFuncTeam', newFuncTeam: e.target.value}),
        handleNewTitleInput: (e) => dispatch({type: 'handleNewTitle', newTitle: e.target.value}),
        handleNewUser: (user) => dispatch({type: 'Newuser', user: user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
