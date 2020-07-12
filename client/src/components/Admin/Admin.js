import React from "react";
import { useHistory } from 'react-router-dom';
import './Admin.css';
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import CardDeck from 'react-bootstrap/CardDeck';


const Admin = (props) => {
    const history = useHistory();
    return (
        <>
            <div className="admin">
                <h1 className="title">Administrator Menu</h1>
                <br></br>
                <CardDeck>
                    <Card className="mb-2" bg='light' style={{ width: '18rem' }}>
                        <Card.Header> Music </Card.Header>
                        <Card.Body>
                            <Card.Title> Add Music </Card.Title>
                            <Card.Text>
                                Use this option to add new music to the list.
                        </Card.Text>
                            <Button block onClick={() => history.push('/addMusic')}>Add Song</Button>
                        </Card.Body>
                    </Card>
                    <Card className="mb-2" bg='light' style={{ width: '18rem' }}>
                        <Card.Header> Change Role </Card.Header>
                        <Card.Body>
                            <Card.Title> Change User Role </Card.Title>
                            <Card.Text>
                                Use this option to change the user role.
                        </Card.Text>
                            <Button block onClick={() => history.push('/changeRole')}>Change Role</Button>
                        </Card.Body>
                    </Card>
                    <Card className="mb-2" bg='light' style={{ width: '18rem' }}>
                        <Card.Header> Approve Songs </Card.Header>
                        <Card.Body>
                            <Card.Title> Approve Song Requests </Card.Title>
                            <Card.Text>
                                Use this option to approve a song to add to the library.
                        </Card.Text>
                            <Button block onClick={() => history.push('/approveNewSong')}>Approve Songs</Button>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>
        </>
    )

}

export default Admin;
