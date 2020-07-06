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

    const updateUser = async () => {
        let updatedUser = await adminService.changeRole(
            state.updateUsername.trim())
        dispatch({ type: 'updateUser', user: ChangeUserRole.data })
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
                    <Button onClick={ChangeUserRole}>Change Role</Button>
                </Form>
            </div>
        </>
    )

}

export default ChangeUserRole;
