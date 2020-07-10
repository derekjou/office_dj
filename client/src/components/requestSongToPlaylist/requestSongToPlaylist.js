import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './requestSongToPlaylist.css';
import SongService from '../../services/song.service';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
const axios = require('axios');

const RequestSongToPlaylist = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const songService = new SongService();

    const [searchResults, setSearchResults] = useState(false)
    const [songRequestSent, setSongRequestSent] = useState(false)
  
    let loggedUsername = JSON.parse(sessionStorage.getItem('loggedUser')).username

    const requestAdd = async (name, owner) => {
        console.log(`${name} ${owner} ${loggedUsername}`)
        let response = await roomService.sendAddRequest(title);
        if (response.status === 204) {
          dispatch({ type: 'handleRoomRequestSuccess', requestRoom: {'name': name} });
          setSongRequestSent(true)
          setTimeout(() => {
            setSongRequestSent(false)
          }, 10000)
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
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="primary"
                                >Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {searchResults ?
                            <ListGroup className="search-res-autocomplete">
                                {state.roomSearchList.map(room => {
                                    return (<>
                                        <ListGroup.Item
                                            key={room.name}
                                            onClick={() => { requestAdd(room.name, room.owner) }}
                                            className="search-res-wrapper"
                                        >
                                            <span className="search-res name">{room.name}</span>
                                            <span className="search-res owner text-muted">{room.owner}</span>
                                        </ListGroup.Item>
                                    </>)
                                })
                                }
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