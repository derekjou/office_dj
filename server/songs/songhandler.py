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
        _log.debug("get request to new song requests")
        return jsonify(db.get_new_song_requests()), 200
    return jsonify("request could not be completed"), 400

@song_page.route('/songs/requestNew/<int:requestId>', methods=['PUT', 'DELETE'])
def process_new_song_request(requestId):
    if request.method == 'PUT':
        _log.info("receved a PUT on songs/requestNew/id")
        if request.json:
            _log.debug(request.json)
            data = request.json['key']
            del data['_id']
            song = Song().from_dict(data)
            if db.add_song(song.to_dict()):
                db.remove_song_request(requestId)
                return jsonify("song added to library"), 200
    elif request.method == 'DELETE':
        _log.info("receved DELETE to songs/requestNew/id")
        db.remove_song_request(requestId)
        return jsonify("request removed"), 200
    else:
        return jsonify("request could not be understod"), 400

@song_page.route('/songs/search', methods=['GET'])
def find_songs():
    _log.debug("find_songs")
    if request.method == 'GET':
        _log.info("receved a GET on songs/search")
        _log.debug(request.args.get('query'))
        responce = db.find_song_partial_string(request.args.get('query'))
        return jsonify(responce), 200
    return jsonify('the server couldn\'t understand your request'), 400

