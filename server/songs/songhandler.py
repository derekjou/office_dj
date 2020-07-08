''''''

from flask import Flask, jsonify, Blueprint, request
import html

import server.data.mongo as db
from server.data.logger import get_logger
from server.songs.model import Song

_log = get_logger(__name__)

song_page = Blueprint('song_page', __name__, static_folder='../static')
request_page = Blueprint('request_page', __name__, static_folder='../static')

@song_page.route('/songs', methods=['GET'])
def see_aproved_songs():
    '''a method to see the list of aproved songs'''
    if request.method == "GET":
        return jsonify(db.get_songs())

@request_page.route('/songs/requestNew', methods=['POST'])
def request_new_song():
    _log.debug("request_new_song called")
    '''a method to request new songs be added to the list of aproved songs'''
    if request.method == "POST":
        if db.new_song_request(request.json):
            return jsonify("request processed"), 201
        else:
            return jsonify("request could not be completed"), 400
        