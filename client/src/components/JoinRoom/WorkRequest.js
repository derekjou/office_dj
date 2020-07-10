import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import UserService from '../../services/user.service'
import Table from 'react-bootstrap/Table'
import RoomService from '../../services/room.service';
import JoinRequest from './JoinRequest';
const axios = require('axios');

const userService = new UserService();
const roomService = new RoomService();

const WorkRequest = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log(props.location.state.roomName)
    console.log(props.location.state.roomOwner)
    async function getJoinRequests() {
      let joinRequests = await roomService.getJoinRequests(props.location.state.roomName);
      let joinData = joinRequests.data[0].participant_requests
      console.log(joinData)
      dispatch({ type: 'handleRoomJoinRequestList', roomJoinRequestList: joinData })
    }
    getJoinRequests();
  }, []);



  const renderHeader = () => {
    let headerElement = ['username', 'department', 'team', 'date of request', 'actions']

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBody = () => {
    
  }

  return (
    <>
      <div>
        <Table responsive="lg" hover>
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody id="data">
            {/* {console.log(state.roomJoinRequestList.isArray())} */}
            {Array.isArray(state.roomJoinRequestList) ? state.roomJoinRequestList.map(
              (request) => {
                console.log(request);
              return <JoinRequest 
                      request={request} 
                      roomName={props.location.state.roomName}
                      roomOwner={props.location.state.roomOwner}
                    />
            }) : null}
          </tbody>
        </Table>
      </div>

    </>
  )
}


export default WorkRequest;