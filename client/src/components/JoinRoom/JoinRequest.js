import React from 'react';
import Button from 'react-bootstrap/Button';
import { Check, Trash } from 'react-bootstrap-icons';
import RoomService from '../../services/room.service';

const JoinRequest = (props) => {

  const roomService = new RoomService()

  const acceptRequest = async () => {
    let resp = await roomService.approveJoinRequest(props.roomName, props.roomOwner, props.request.username);
    if (resp.status === 204) {
      window.alert(`User ${props.request.username} added to room!`)
      document.location.reload();
    }

  }

  const rejectRequest = async () => {
    let resp = await roomService.rejectJoinRequest(props.roomName, props.roomOwner, props.request.username);
    if (resp.status === 204) {
      window.location.reload(false);
    }
  }

  return (
    <tr key={props.request.username}>
      {console.log(props.request)}
      <td>{props.request.username}</td>
      <td>{props.request.department}</td>
      <td>{props.request.functional_team}</td>
      <td>{props.request.date_requested}</td>
      <td className='actions'>
        <Button block onClick={acceptRequest}>
          <Check />
        </Button>
        <Button block onClick={rejectRequest}>
          <Trash />
        </Button>
      </td>
    </tr>
  )
}

export default JoinRequest;