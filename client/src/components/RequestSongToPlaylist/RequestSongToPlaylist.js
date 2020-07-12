import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './RequestSongToPlaylist.css';
import SongService from '../../services/song.service';
import RoomService from '../../services/room.service';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

const RequestSongToPlaylist = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const songService = new SongService();
    const roomService = new RoomService();

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

    const searchSongs = async (query) => {
        if(query.trim().length < 1) {
            dispatch({ type: 'handleSongSearch', songSearchList: [] });
        } else {
            let songSearchList = await songService.findSongs(query)
            if (songSearchList.status === 200) {
                dispatch({ type: 'handleSongSearch', songSearchList: songSearchList.data });
            }
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
                                    searchSongs(e.target.value);
                                }}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="primary"
                                >Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {state.songSearchList ?
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

export default RequestSongToPlaylist;