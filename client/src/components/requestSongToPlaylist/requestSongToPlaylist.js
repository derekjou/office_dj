import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './requestSongToPlaylist.css';
import SongService from '../../services/song.service';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
const axios = require('axios');

const RequestSongToPlaylist = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const songService = new SongService();
    const roomService = new RoomService();

    const [searchResults, setSearchResults] = useState(false)
    const [songRequestSent, setSongRequestSent] = useState(false)

    const requestAdd = async (song) => {
        let response = await roomService.sendAddRequest(props.currentRoom._id, song._id);
        if (response.status === 204) {
            dispatch({ type: 'handleSongRequestSuccess', requestSong: {'requestSongTitle': song.title} });
            setSongRequestSent(true)
        }
    }

    const searchSongs = async () => {
        console.log(state.songSearchQuery);
        let query = state.songSearchQuery;
        let songSearchList = await songService.findSongs(query)
        if (songSearchList.status === 200) {
            dispatch({ type: 'handleSongSearch', songSearchList: songSearchList.data });
            setSearchResults(true)
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Find a song</Form.Label>
                        <InputGroup size="lg">
                            <Form.Control
                                type="text"
                                size="lg"
                                placeholder="Search by song title"
                                onChange={e => {
                                    dispatch({ type: 'handleSongSearchQuery', songSearchQuery: e.target.value });
                                    searchSongs();
                                }}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="primary"
                                >Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {searchResults ?
                            <ListGroup className="search-res-autocomplete">
                                {state.songSearchList.map(song => {
                                    return (
                                        <>
                                            <ListGroup.Item
                                                key={song._id}
                                                onClick={() => { requestAdd(song) }}
                                                className="search-res-wrapper"
                                            >
                                                <span className="search-res title">
                                                    {song.title}
                                                </span>
                                                <span className="search-res artist text-muted">
                                                    {song.artist}
                                                </span>
                                            </ListGroup.Item>
                                        </>
                                    )
                                })}
                            </ListGroup>
                        : null}
                    </Form.Group>
                </Card.Body>
            </Card>
            {songRequestSent ?
                window.alert("Request sent to the owner of the room")
            : null}
        </>
    )
}

export default RequestSongToPlaylist