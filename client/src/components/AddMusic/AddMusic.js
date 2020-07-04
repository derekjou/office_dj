import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import './AddMusic.css';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
const axios = require('axios');

class NewMusic extends Component {

    newMusic() {
        let NewMusic = axios({
            method: 'POST',
            url: 'http://localhost:5000/music/add',
            data: {
                title: this.props.title,
                artists: this.props.artists,
                album: this.props.album,
                genre: this.props.genre

            }
        })

        this.props.handleNewMusic(NewMusic);
    }

    render() {
        return (
            <>
                <div className="Register">
                    <h1 className="Title">Add Music</h1>
                    <br></br>
                    <Form>
                        <Form.Group controlId='title'>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" name="title" placeholder="Enter title"
                                value={this.props.title}
                                onChange={this.props.handleTitleInput} />
                        </Form.Group>
                        <Form.Group controlId='artists'>
                            <Form.Label>Artists:</Form.Label>
                            <Form.Control type="text" name="artists" placeholder="Enter artists"
                                value={this.props.artists}
                                onChange={this.props.handleArtistsInput} />
                        </Form.Group>
                        <Form.Group controlId='album'>
                            <Form.Label>Album:</Form.Label>
                            <Form.Control type="text" name="album" placeholder="Enter album"
                                value={this.props.album}
                                onChange={this.props.handleAlbumInput} />
                        </Form.Group>
                        <Form.Group controlId='genre'>
                            <Form.Label>Genre:</Form.Label>
                            <Form.Control type="text" name="genre" placeholder="Enter genre"
                                value={this.props.genre}
                                onChange={this.props.handleGenreInput} />
                        </Form.Group>
                        <Button block onClick={() => this.newMusic()}>Register</Button>
                    </Form>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { song, title, artists, album, genre } = state;
    return {
        Newsong: song,
        title: title,
        artists: artists,
        album: album,
        genre: genre
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleTitleInput: (e) => dispatch({ type: 'handleTitleInput', title: e.target.value }),
        handleArtistsInput: (e) => dispatch({ type: 'handleArtistsInput', artists: e.target.value }),
        handleAlbumInput: (e) => dispatch({ type: 'handleAlbumInput', album: e.target.value }),
        handleGenreInput: (e) => dispatch({ type: 'handleGenreInput', genre: e.target.value }),
        handleNewMusic: (song) => dispatch({ type: 'NewMusic', song: song })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMusic);
