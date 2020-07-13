import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AddMusic.css';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import AdminService from '../../services/admin.service'
const axios = require('axios');

const AddMusic = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const adminService = new AdminService();
    const newSong = async () => {
        await adminService.newSong(state.title, state.artists, state.album, state.genre, state.url, state.albumUrl);
        history.push('/admin')
    }

    return (
        <>
            <div className="register">
                <h1 className="title">Add Music</h1>
                <br></br>
                <Form>
                    <Form.Group controlId='title'>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Enter title"
                            value={state.title}
                            onChange={e => dispatch({type: "handleTitleInput", title: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='artists'>
                        <Form.Label>Artists:</Form.Label>
                        <Form.Control type="text" name="artists" placeholder="Enter artists"
                            value={state.artists.join(", ")}
                            onChange={e => dispatch({type: "handleArtistsInput", artists: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='album'>
                        <Form.Label>Album:</Form.Label>
                        <Form.Control type="text" name="album" placeholder="Enter album"
                            value={state.album}
                            onChange={e => dispatch({type: "handleAlbumInput", album: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='albumUrl'>
                        <Form.Label>Album Cover Url:</Form.Label>
                        <Form.Control type="text" name="album" placeholder="Enter album art url"
                            value={state.albumUrl}
                            onChange={e => dispatch({type: "handleAlbumUrlInput", albumUrl: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='genre'>
                        <Form.Label>Genre:</Form.Label>
                        <Form.Control type="text" name="genre" placeholder="Enter genre"
                            value={state.genre}
                            onChange={e => dispatch({type: "handleGenreInput", genre: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId='url'>
                        <Form.Label>URL:</Form.Label>
                        <Form.Control type="text" name="url" placeholder="Enter URL"
                            value={state.url}
                            onChange={e => dispatch({type: "handleURLInput", url: e.target.value})} />
                    </Form.Group>
                    <Button block onClick={newSong}>Add Song</Button>
                </Form>
            </div>
        </>
    )
    
}

export default AddMusic;
