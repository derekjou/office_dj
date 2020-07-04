import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// TODO: CSS
import { connect } from 'react-redux';

const UpVote = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(props)

  useEffect( () => {

  });

  const vote = () => {
    console.log(props.room.name)
    dispatch({ type: 'getCurrentRoom', currentRoom: props.room })
  }

  return (
    <Button>
      <ArrowUpwardIcon />
    </Button>
  )

}