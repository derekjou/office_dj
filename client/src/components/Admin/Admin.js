import React, { Component } from "react";
import './Admin.css';
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";

const axios = require('axios');


class Admin extends Component {

    render() {
        return (
            <>
                <div className="Admin">
                    <h1 className="Title">Administrator Menu</h1>
                    <br></br>
                    <Card bg='light' className="mb-2" >
                        <Card.Header> Music </Card.Header>
                        <Card.Body>
                            <Card.Title> Add Music </Card.Title>
                            <Card.Text>
                                Use this option to add new music to the list.
                            </Card.Text>
                            <Button block>Music</Button>
                        </Card.Body>
                    </Card>
                </div>
            </>
        )
    }
}

export default Admin;
