import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import UserService from '../../services/user.service'
import Table from 'react-bootstrap/Table'
const axios = require('axios');

const userService = new UserService();

const WorkRequest = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const acceptRequest = async () => {

  }

  const rejectRequest = async () => {

  }

  const renderHeader = () => {
    let headerElement = ['username', 'department', 'team', 'date of request', 'actions']

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBody = () => {
    return (
      <tr key={username}>
        <td>{username}</td>
        <td>{department}</td>
        <td>{team}</td>
        <td>{date}</td>
        <td className='actions'>
          <Button block onClick={acceptRequest}>
            Accept
            </Button>
          <Button block onClick={rejectRequest}>
            Reject
            </Button>
        </td>
      </tr>
    )
  }

  return (
    <>
      <div>
        <Table responsive="lg" hover>
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody id="data">
            {renderBody()}
          </tbody>
        </Table>
      </div>

    </>
  )
}


export default WorkRequest;