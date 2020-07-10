import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SongService from '../../services/song.service';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

const AdminApproveNewSong = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const songService = new SongService();

    useEffect( () => {
        async function getNewSongRequests() {
            let resp = songService.getNewSongRequests()
            dispatch({ type: 'setSongRequests', requests: resp })
        }
        getNewSongRequests();
    }, []);

    return (
        <div>
            {state.songRequests.map(request => (
                <p key={request._id}>{request.title}</p>
            ))}
        </div>
    )

}

export default AdminApproveNewSong;