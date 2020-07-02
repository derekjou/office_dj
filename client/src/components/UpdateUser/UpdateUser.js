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

    const updateUser = () => {
        this.userService.updateUser(
            state.updateUsername, 
            state.updatePassword, 
            state.updateDpt, 
            state.updateFuncTeam, 
            state.updateTitle).then(resp => {
                dispatch({ type: 'updateUser', user: resp.data })
            });
    }

    return (
        <>
            <div className="Update" style={{ width: '30%', height: 'auto', margin: 'auto' }}>
                <h1 style={{ textAlign: 'center' }}>UPDATE USER INFO</h1>
                <br></br>
                    <label>
                        Username
            <input className="form-control" type="text" name="username" placeholder={state.username}
                            value={state.updateUsername}
                            onChange={e => dispatch({ type: 'handleUpdateUsername', updateUsername: e.target.value })} />
                    </label>
                    <label for="password">
                        Password
            <input className="form-control" type="password" name="password" placeholder={state.password}
                            value={state.updatePassword}
                            onChange={e => dispatch({ type: 'handleUpdatePassword', updatePassword: e.target.value })} />
                    </label>
                    <label for="department">
                        Department
            <input className="form-control" type="text" name="department" placeholder={state.department}
                            value={state.updateDpt}
                            onChange={e => dispatch({ type: 'handleUpdateDepartment', updateDpt: e.target.value })} />
                    </label>
                    <label for="functional_team">
                        Functional Team
            <input className="form-control" type="text" name="functional_team" placeholder={state.functional_team}
                            value={state.updateFuncTeam}
                            onChange={e => dispatch({ type: 'handleUpdateFuncTeam', updateFuncTeam: e.target.value })} />
                    </label>
                    <label for="title">
                        Title
            <input className="form-control" type="text" name="title" placeholder={state.title}
                            value={state.updateTitle}
                            onChange={e => dispatch({ type: 'handleUpdateTitle', updateTitle: e.target.value })} />
                    </label>
                    <br></br>
                    <Button onClick={updateUser}>Submit</Button>
                </div>
        </>
    )
    
}

export default UpdateUser;
