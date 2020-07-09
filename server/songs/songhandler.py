'''a method to handle requests to songs'''

from flask import Flask, jsonify, Blueprint, request
import html

import server.data.mongo as db
from server.data.logger import get_logger
from server.songs.model import Song

_log = get_logger(__name__)

song_page = Blueprint('song_page', __name__, static_folder='../static')

@song_page.route('/songs', methods=['GET'])
def see_aproved_songs():
    '''a method to see the list of aproved songs'''
    if request.method == "GET":
        return jsonify(db.get_songs())

@song_page.route('/songs/requestNew', methods=['POST', 'GET'])
def request_new_song():
    _log.debug("request_new_song called")
    '''a method to request new songs be added to the list of aproved songs'''
    if request.method == "POST":
        if request.json:
            song = Song().from_dict(request.json)
        if db.new_song_request(song.to_dict()):
            return jsonify("request processed"), 201
    elif request.method == "GET":
        return db.get_new_song_requests(), 200
    return jsonify("request could not be completed"), 400

@song_page.route('/songs/requestNew/<int:requestId>', methods=['POST', 'DELETE'])
def process_new_song_request(song_dict):
    if request.method == 'POST':
        if request.json:
            song = Song().from_dict(request.json)
            if db.add_song(song.to_dict()):
                