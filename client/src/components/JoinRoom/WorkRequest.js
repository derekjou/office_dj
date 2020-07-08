import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import AdminService from '../../services/admin.service'
const axios = require('axios');

const adminService = new AdminService();

const WorkRequest = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const acceptRequest = async () => {

  }

  const rejectRequest = async () => {

  }


  return (
    <>
      <ListGroup variant="flush">
        {/* TODO: All the request */}
        <Button block onClick={approvejoin}>Accept</Button>
        <Button block onClick={approvejoin}>Reject</Button>
      </ListGroup>
    </>
  )
}

export default WorkRequest;