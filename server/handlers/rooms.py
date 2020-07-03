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
room_page = Blueprint('room_page', __name__, static_folder='../static/rooms')


@room_page.route('/<string:name>', methods=['GET', 'POST'])
def rooms_collection(name):
    '''A GET to /rooms/<name> returns that room, a POST to /rooms/<name> creates a new room of that name.'''
    if request.method == 'POST':
        _log.info('Request for new room')
        #create new room
        #TODO: decode JWT tokens once we know what is in them.
        input_dict = request.json
        room = Room.from_dict(input_dict)
        db.add_room(room)
        return room.to_dict(), 200
    else:
        _log.info('Request for room %s', name)
        room_id = request.args.get('id')
        # NOTE: all requests should send id as a query string
        return jsonify(db.get_room_by_id(name, room_id))


@room_page.route('/myrooms/<string:username>', methods=['GET'])
def my_rooms_collection(username):
    '''A GET to /rooms/<username> returns all rooms belonging to that username.'''
    _log.debug('Request for rooms belonging to s')
    room_list = db.get_rooms_by_user(username)
    return jsonify(room_list), 200
