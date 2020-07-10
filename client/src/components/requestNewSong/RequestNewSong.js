import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SongService from '../../services/song.service';
import AdminService from '../../services/admin.service';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
const axios = require('axios');

const RequestNewSong = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const songService = new SongService();

    const requestNewSong = async () => {
        await songService.requestNewSong(state.title, state.genre, state.artists, state.url, state.album)
        history.push('/')
    }

    return (
        <>
            <div className="requestNewSong">
                <h1 className="title">New Song Request</h1>
                <br/>
                <Form>
                    <Form.Group controlId='songName'>
                        <Form.Label>Song Name</Form.Label>
                        <Form.Control type="text" name="songName" placeholder="Enter Song Name"
                            value={state.title}
                            onChange={e => dispatch({type: "handleNewSongName", title: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='genre'>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" name="genre" placeholder="Enter Song Genre"
                            value={state.genre}
                            onChange={e => dispatch({type: "handleNewGenre", genre: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='artist'>
                        <Form.Label>Artist</Form.Label>
                        <Form.Control type="text" name="artist" placeholder="Enter Artists"
                            value={state.artist}
                            onChange={e => dispatch({type: "handleNewArtist", artists: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='album'>
                        <Form.Label>Song Album</Form.Label>
                        <Form.Control type="text" name="album" placeholder="Enter Album"
                            value={state.songName}
                            onChange={e => dispatch({type: "handleNewAlbum", album: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='url'>
                        <Form.Label>Song URL</Form.Label>
                        <Form.Control type="text" name="url" placeholder="Enter Song location ex: www.thissong.com/12345"
                            value={state.url}
                            onChange={e => dispatch({type: "handleNewUrl", url: e.target.value})} />
                    </Form.Group>
                    <Button block onClick={requestNewSong}>Submit Request</Button>
                </Form>
            </div>
        </>
    )
}

export default RequestNewSong