import React, { useEffect, useState } from './node_modules/react';
import { useSelector, useDispatch } from './node_modules/react-redux';
import { useHistory } from './node_modules/react-router-dom';
import './requestSongToPlaylist.scss';
import SongService from '../../services/song.service';
import RoomService from '../../services/room.service';
import InputGroup from './node_modules/react-bootstrap/InputGroup';
import Card from './node_modules/react-bootstrap/Card';
import ListGroup from './node_modules/react-bootstrap/ListGroup';
import Button from './node_modules/react-bootstrap/Button';
import Form from "./node_modules/react-bootstrap/Form";
const axios = require('./node_modules/axios');

const RequestSongToPlaylist = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const songService = new SongService();
    const roomService = new RoomService();

    const [searchResults, setSearchResults] = useState(false)
    const [songRequestSent, setSongRequestSent] = useState(false)

    const requestAdd = async (song) => {
        console.log(song)
        console.log(props.currentRoom)
        let response = await roomService.sendAddRequest(4, song._id);
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
                <Card.Body className="search-songs">
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
                                                <span className="search-res song-title">
                                                    {song.title}
                                                </span>
                                                <span className="search-res song-artist">
                                                    {song.artists ? song.artists.join(', ') : null}
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