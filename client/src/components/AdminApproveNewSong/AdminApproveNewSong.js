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
        console.log("useEffect")
        async function getNewSongRequests() {
            let resp = await songService.getNewSongRequests()
            console.log(resp)
            dispatch({ type: 'setSongRequests', requests: resp.data })
            history.push('/approvenewsong')
        }
        getNewSongRequests();
    }, []);

    async function approve(request) {
        await songService.approveNewSong(request)
        }

    return (
        <div>
            {state.songRequests.map(request => (
                <p key={request._id}>
                    {request.title}
                    <Button block type="button" onClick={() => {approve(request)}}>Aprove</Button>
                </p>
            ))}
        </div>
    )

}

export default AdminApproveNewSong;