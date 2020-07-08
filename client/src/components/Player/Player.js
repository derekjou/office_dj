import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RoomService from '../../services/room.service';
import Container from 'react-bootstrap/Container';
import './Player.scss';

const Player = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const roomService = new RoomService();

    useEffect(() => {
        console.log(props.currentRoom)
        async function getPlaylist() {
            console.log(props.currentRoom.name);
            let resp = await roomService.getPlaylist(props.currentRoom._id);
            let playlist = await resp.data;
            sessionStorage.setItem('loggedPlaylist', JSON.stringify(playlist))
            let audio = document.getElementById('audio');
            let source = document.getElementById('source');
            source.src = playlist.playlist[0].url;
            audio.currentTime = playlist.currentTime;
            audio.load();
        }
        getPlaylist();
    }, []);
    
    const nextSong = () => {
        let audio = document.getElementById('audio');
        let source = document.getElementById('source');
        let playlist = JSON.parse(sessionStorage.getItem('loggedPlaylist'))
        playlist.shift();
        source.src = playlist[0].url
        console.log('Retrieving next song', playlist)
        audio.load();
        audio.play();
    }



    return (
        <Container fluid>
            <audio id="audio" controls onEnded={nextSong}>
                <source id="source" src=""/>
            </audio>
        </Container>
    );
}

export default Player;