import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
const axios = require('axios');

class NewUser extends Component {
    
  
    newUser() {
        let user = axios({
            method: 'POST',
            url: 'http://localhost:5000/users/register',
            data: {
                newUsername: this.props.newUsername, 
                newPassword: this.props.newPassword, 
                newDpt: this.props.newDpt, 
                newFuncTeam: this.props.newFuncTeam, 
                newTitle: this.props.newTitle

            }
        })

        this.props.handleNewUser(user);

    }


  render() {
    return <div>
        <p>New USER INFO</p>
            <label>
                Username
                <input className="form-control" type="text" name="username" placeholder={this.props.Newuser.username}
                                    value={this.props.newUsername}
                                    onChange={this.props.handleNewUsernameInput} />
            </label>
            <label for="password">
                Password
                <input className="form-control" type="password" name="password" placeholder={this.props.Newuser.password}
                                    value={this.props.newPassword}
                                    onChange={this.props.handleNewPasswordInput} />
            </label>
            <label for="department">
                Department
                <input className="form-control" type="text" name="department" placeholder={this.props.Newuser.department}
                                    value={this.props.newDpt}
                                    onChange={this.props.handleNewDepartmentInput} />
            </label>
            <label for="functional_team">
                Functional Team
                <input className="form-control" type="text" name="functional_team" placeholder={this.props.Newuser.functional_team}
                                    value={this.props.newFuncTeam}
                                    onChange={this.props.handleNewFuncTeamInput} />
            </label>
            <label for="title">
                Title
                <input className="form-control" type="text" name="title" placeholder={this.props.Newuser.title}
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
        handleNewUser: (user) => dispatch({type: 'NewUser', user: user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
