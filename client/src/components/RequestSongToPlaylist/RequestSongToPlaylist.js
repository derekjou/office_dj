import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './RequestSongToPlaylist.scss';
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
    const { id } = useParams();

    const songService = new SongService();
    const roomService = new RoomService();

    const [songRequestSent, setSongRequestSent] = useState(false)

    const requestAdd = async (song) => {
        console.log(song)
        console.log('roomid', id)
        let response = await roomService.sendAddRequest(parseInt(id), song._id); // test
        // let response = await roomService.sendAddRequest(state.currentRoom._id, song._id);
        if (response.status === 204) {
            dispatch({ type: 'handleSongRequestSuccess', requestSong: {'requestSongTitle': song.title} });
            setSongRequestSent(true)
            document.location.reload();
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
            <Card className="search-songs-wrapper">
                <Card.Body className="search-songs">
                    <Form.Group>
                        <Form.Label><h5>Request a Song</h5></Form.Label>
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

export default RequestSongToPlaylist;