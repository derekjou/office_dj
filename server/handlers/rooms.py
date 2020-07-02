''' A handler for Room operations in our server '''

# External Modules
from os import path
from flask import Flask, jsonify, Blueprint, request
from datetime import datetime, date
import urllib.parse
import html
# Internal Modules
import server.data.mongo as db
from server.data.logger import get_logger
from server.model.rooms import Room

_log = get_logger(__name__)

#TODO: this should not be static
room_page = Blueprint('room_page', __name__, static_folder='../static')


@room_page.route('/rooms/<string:name>', methods=['GET', 'POST'])
def room_collection(name):
    '''A GET to /rooms/<name> returns that room, a POST to /rooms/<name> creates a new room of that name.'''
    if request.method == 'POST':
        _log.info('Request for new room')
        #create new room
        #TODO: decode JWT tokens once we know what is in them.
        input_dict = request.json
        room = Room.from_dict(input_dict)
        db.add_room(room)
        return room.to_dict()
    else:
        _log.info('Request for room %s', name)
        room_id = request.args.get('id')
        # NOTE: all requests should send id as a query string
        return jsonify(db.get_room_by_id(room_id))
