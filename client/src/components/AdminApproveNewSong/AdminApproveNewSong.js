import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AdminApproveNewSong.css'
import SongService from '../../services/song.service';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import Form from "react-bootstrap/Form";
import JoinRequest from '../JoinRoom/JoinRequest';

const AdminApproveNewSong = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const songService = new SongService();

    useEffect( () => {
        console.log("useEffect")

        getNewSongRequests();
    }, []);

    async function getNewSongRequests() {
        let resp = await songService.getNewSongRequests()
        console.log(resp)
        dispatch({ type: 'setSongRequests', requests: resp.data })
    }

    async function approve(request) {
        await songService.approveNewSong(request)
        getNewSongRequests()
        }

    async function deny(request) {
        await songService.rejectNewSong(request)
        getNewSongRequests()
        }

    function previewSong(request) {
        window.open(request.url, request.title)
    }

    const renderHeader = () => {
        let headerElement = ['Title', 'Artists', 'Genre', 'Album', '', '', '']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    return (
        <div>
        <Table responsive="lg" hover>
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody id="data">
              {Array.isArray(state.songRequests) ? state.songRequests.map(
                  (request) => {
                      return <>
                      <td>{request.title}</td>
                      <td>{request.artists}</td>
                      <td>{request.genre}</td>
                      <td>{request.album}</td>
                      <td><Button block type="button" onClick={() => {previewSong(request)}}>Preview Song</Button></td>
                      <td><Button block type="button" onClick={() => {approve(request)}}>Approve</Button></td>
                      <td><Button block type="button" onClick={() => {deny(request)}}>Reject</Button></td>
                      </>
                  }
              ) : null }
            </tbody>
        </Table>
        </div>
    )

}

export default AdminApproveNewSong;