''' A handler for Room operations in our server '''

# External Modules
from os import path
from flask import Flask, jsonify, Blueprint, request
from datetime import datetime, date
import urllib.parse
import html
import werkzeug
# Internal Modules
import server.data.mongo as db
from server.data.logger import get_logger
from server.model.rooms import Room

_log = get_logger(__name__)

#TODO: this should not be static
room_page = Blueprint('room_page', __name__, static_folder='../static')


@room_page.route('/rooms/<string:name>', methods=['GET', 'POST'])
def rooms_collection(name):
    '''A GET to /rooms/<name> returns that room, a POST to /rooms/<name> creates a new room of that name.'''
    if request.method == 'POST':
        _log.info('Request for new room')
        input_dict = request.json
        room = Room.from_dict(input_dict)
        db.add_room(room)
        return input_dict, 200

@room_page.route('/rooms/<string:name>/join', methods=['GET', 'POST'])
def request_join_rooms_collection(name):
    '''A GET to /rooms/<name>/join returns a dict of all join requests for a room, a POST searches for rooms 
       that match a partial string.'''
    if request.method == 'POST':
        body = request.json
        owner = body['owner']
        _log.debug(f'{name} {owner}')
        room = db.get_room_by_name(name, owner)
        _log.debug(body['username'])
        user = db.find_user(body['username'])
        room.add_participant_request(user)
        db.update_room(room)
        #TODO: error handling
        return '', 204
    else:
        name = name.replace('%20', ' ')
        return jsonify(db.get_participant_requests(name))

@room_page.route('/rooms/<string:name>/join/<string:username>', methods=['POST', 'DELETE'])
def request_join_rooms_user(name, username):
    '''A POST to rooms/<name>/join/<username> approves a request to join, a DELETE denies a request.'''
    body = request.json
    _log.debug(body)
    room = db.get_room_by_name(name, body['owner'])
    if request.method == 'POST':
        _log.info('Approving the user %s to join room %s', body['username'], name)
        user = db.find_user(username)
        room.approve_participant(user)
    else: 
        _log.debug(body['owner'])
        room.reject_participant(username)
    db.update_room(room)
    return '', 204

@room_page.route('/rooms/myrooms/<string:username>', methods=['GET'])
def my_rooms_collection(username):
    '''A GET to /rooms/myrooms/<username> returns all rooms belonging to that username.'''
    _log.debug(username)
    _log.info('Request for rooms belonging to %s', username)
    room_list = db.get_rooms_by_user(username)
    _log.debug(room_list)
    return jsonify(room_list), 200

@room_page.route('/rooms/userRooms/<string:username>', methods=['GET'])
def get_user_rooms(username):
    '''A GET to /rooms/userRooms/<string:username> returns rooms a user has joined'''
    _log.info('Request for rooms %s has joined', username)
    room_list = db.get_user_rooms(username)
    _log.debug(room_list)
    return jsonify(room_list), 200

@room_page.route('/rooms/djRooms/<string:username>', methods=['GET'])
def get_dj_rooms(username):
    '''A GET to /rooms/djRooms/<string:username> returns rooms a DJ owns'''
    _log.info('Request for rooms %s has created', username)
    room_list = db.get_dj_rooms(username)
    _log.debug(room_list)
    return jsonify(room_list), 200

@room_page.route('/rooms/search', methods=['GET'])
def search_rooms_collection():
    '''A GET to /rooms/search searches for rooms that match a partial string.'''
    query = request.args.get('query')
    _log.info('Request for rooms matching \'%s\'', query)
    room_list = db.find_room_partial_string(query)
    if room_list:
        _log.info('Request for \'%s\' successfully handled', query)
        return jsonify(room_list), 200
    else:
        return 204

@room_page.route('/rooms/myrooms/playlist/<int:room_id>', methods=['GET', 'PUT', 'DELETE'])
def room_playlist(room_id):
    '''A GET to /rooms/myrooms/playlist/<room_name> returns playlist of a room
       A PUT updates the last known timestamp
       A DELETE returns the updated playlist'''
    if request.method == 'GET':
        _log.debug(room_id)
        _log.info('Request for playlist of room %s', room_id)
        playlist = db.get_room_playlist(room_id)
        return jsonify(playlist), 200
    elif request.method == 'PUT':
        _log.debug(room_id)
        body = request.json
        _log.info('Updating playlist of room %s', room_id)
        playlist = db.update_timestamp(room_id, int(body['timeStamp']))
        return jsonify(playlist), 200
    elif request.method == 'DELETE':
        _log.debug(room_id)
        # updating the song play history
        last_song_id = db.get_last_played_id(room_id)
        _log.info('Updating the play history of %d', last_song_id)
        db.increment_song_play_history(room_id, last_song_id)
        # removing the last played song from playlist
        _log.info('Updating playlist of room %s', room_id)
        playlist = db.remove_playlist_song(room_id)
        return jsonify(playlist), 200

@room_page.route('/rooms/myrooms/playlist/<int:room_id>/request/<int:song_id>', methods=["POST", "PUT", "DELETE"])
def request_add_song(room_id, song_id):
    '''a POST sends a request to add a song to the current room\'s playlist
        a PUT adds the song to the playlist and removes it from the request list
        a DELETE removes a request'''
    if request.method == 'POST':
        _log.info("POST to request_add_song")
        if db.add_song_to_playlist_request(room_id, song_id):
            db.increment_song_request_history(room_id, song_id)
            return jsonify('song added to requests'), 200
    if request.method == 'PUT':
        _log.info("PUT to request_add_song receved")
        db.add_song_to_playlist(room_id, song_id)
        db.remove_song_from_playlist_request(room_id, song_id)
        return jsonify("song added to playlist"), 200
    if request.method == 'DELETE':
        _log.info("DELETE to request_add_song")
        db.remove_song_from_playlist_request(room_id, song_id)
        return jsonify("song removed from requests"), 200
    return jsonify('request could not be undersood and/or processed'), 400


@room_page.route('/rooms/myroom/playlist/requests', methods=['GET'])
def process_playlist_requests():
    '''a GET retreves requests to the playlist from the database'''
    _log.debug("GET request to playlist requests")
    if request.method == "GET":
        _log.debug("GET request to playlist requests")
        _log.debug(request.args.get('query'))
        room_id = int(request.args.get('query'))
        request_ids = db.playlist_request(room_id)['playlist']['requests']
        _log.debug(request_ids)
        song_requests = {}
        for id in request_ids:
            song_requests[id] = db.get_song_by_id(id)
        return jsonify(song_requests), 200

@room_page.route('/rooms/myrooms/playlist/<int:room_id>/history/<int:song_id>', methods=['GET'])
def process_song_histor(room_id, song_id):
    song_history = db.get_song_history(room_id, song_id)
    _log.debug(song_history)
    return jsonify(song_history)

@room_page.route('/rooms/room/<int:room_id>', methods=["GET"])
def get_room(room_id):
    '''A GET returns room of id'''
    if request.method == 'GET':
        _log.info('GET to get room')
        room = db.get_room_by_id(room_id)
        return jsonify(room), 200
