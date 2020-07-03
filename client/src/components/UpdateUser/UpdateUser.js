import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserService from '../../services/user.service'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UpdateUser = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const userService = new UserService();

    let loggedUsername = JSON.parse(sessionStorage.getItem('loggedUser')).username
    const updateUser = async () => {
        let updatedUser = await userService.updateUser(
            loggedUsername,
            state.updateUsername.trim(), 
            state.updatePassword.trim(), 
            state.updateDpt.trim(), 
            state.updateFuncTeam.trim(), 
            state.updateTitle.trim())
        sessionStorage.setItem('loggedUser', JSON.stringify(updatedUser.data));
        dispatch({ type: 'updateUser', user: updatedUser.data })
        history.push('/')
    }

    return (
        <>
            <div className="Update">
                <h1 className="Title">UPDATE USER INFO</h1>
                <br></br>
                <Form>
                    <Form.Group controlId='username'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder={state.username}
                            value={state.updateUsername}
                            onChange={e => dispatch({ type: 'handleUpdateUsername', updateUsername: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" name="password" placeholder={state.password}
                            value={state.updatePassword}
                            onChange={e => dispatch({ type: 'handleUpdatePassword', updatePassword: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId='department'>
                        <Form.Label>Department:</Form.Label>
                        <Form.Control type="text" name="department" placeholder={state.department}
                            value={state.updateDpt}
                            onChange={e => dispatch({ type: 'handleUpdateDepartment', updateDpt: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId='functional_team'>
                        <Form.Label>Functional Team:</Form.Label>
                        <Form.Control type="text" name="functional_team" placeholder={state.functional_team}
                            value={state.updateFuncTeam}
                            onChange={e => dispatch({ type: 'handleUpdateFuncTeam', updateFuncTeam: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId='title'>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" name="title" placeholder={state.title}
                            value={state.updateTitle}
                            onChange={e => dispatch({ type: 'handleUpdateTitle', updateTitle: e.target.value })} />
                    </Form.Group>
                    <Button onClick={updateUser}>Submit</Button>
                </Form>
            </div>
        </>
    )

}

export default UpdateUser;
