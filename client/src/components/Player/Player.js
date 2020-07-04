import React, { useEffect } from 'react';
import ReactPlayer from 'react-player'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Player.css';
import UserService from '../../services/user.service';

const Player = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const userService = new UserService();

    return (
        <>
            <div className='player-wrapper'>
                <ReactPlayer
                    url='http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3'
                    className='react-player'
                    width='50%'
                    height='50%'
                    controls
                />
            </div>
        </>
    )

}

export default Player;