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

        getNewSongRequests();
    }, []);

    async function getNewSongRequests() {
        let resp = await songService.getNewSongRequests()
        console.log(resp)
        dispatch({ type: 'setSongRequests', requests: resp.data })
    }

    async function approve(request) {
        await songService.approveNewSong(request)
        getNewSongRequests()
        }

    async function deny(request) {
        await songService.rejectNewSong(request)
        getNewSongRequests()
        }

    return (
        <div>
            {state.songRequests.map(request => (
                <p key={request._id}>
                    {request.title}
                    <Button block type="button" onClick={() => {approve(request)}}>Aprove</Button>
                    <Button block type="button" onClick={() => {deny(request)}}>Reject</Button>
                </p>
            ))}
        </div>
    )

}

export default AdminApproveNewSong;