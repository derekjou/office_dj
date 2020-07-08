import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ChangeUserRole.css';
import AdminService from '../../services/admin.service';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ChangeUserRole = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const adminService = new AdminService();

    const updateUser = async (e) => {
        e.preventDefault();
        console.log(state.updateUsername)
        let updatedUser = await adminService.changeRole(state.updateUsername)
        console.log(updatedUser)
        dispatch({ type: 'updateUser', user: updatedUser.data })
        history.push('/')
    }

    return (
        <>
            <div className="update">
                <h1 className="title">UPDATE USER ROLE</h1>
                <br></br>
                <Form>
                    <Form.Group controlId='username'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter username"
                            value={state.updateUsername}
                            onChange={e => dispatch({ type: 'handleUpdateUsername', updateUsername: e.target.value })} />
                    </Form.Group>
                    <Button onClick={updateUser}>Change Role</Button>
                </Form>
            </div>
        </>
    )

}

export default ChangeUserRole;
