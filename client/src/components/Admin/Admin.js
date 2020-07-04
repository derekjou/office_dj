import React, { Component } from "react";
import { useHistory } from 'react-router-dom';
import './Admin.css';
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";


const Admin = (props) => {
    const history = useHistory();
    return (
        <>
            <div className="admin">
                <h1 className="title">Administrator Menu</h1>
                <br></br>
                <Card bg='light'>
                    <Card.Header> Music </Card.Header>
                    <Card.Body>
                        <Card.Title> Add Music </Card.Title>
                        <Card.Text>
                            Use this option to add new music to the list.
                        </Card.Text>
                        <Button block onClick={() => history.push('/addMusic')}>Add Song</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
    
}

export default Admin;
