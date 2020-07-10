import React from 'react';
// TODO: CSS

import Toast from 'react-bootstrap/Toast';
import './JoinRoom.scss'

const RoomRequestSuccess = (props) => {

  return(
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'relative',
        minHeight: '100px',
      }}
    >
      <Toast
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
        }}
        className='request-sent success'
        show={props.roomRequestSent} 
        onClose={props.setRoomRequestSent}
        variant='success'
      >
        <Toast.Header>
          <strong className="mr-auto">Request to join {props.room.name} sent!</strong>
        </Toast.Header>
        <Toast.Body>{props.room.owner} will review your request.</Toast.Body>
      </Toast>
    </div>
  )
}

export default RoomRequestSuccess;