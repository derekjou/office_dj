''' A handler for Room operations in our server '''

# External Modules
from os import path
from flask import Flask, jsonify, Blueprint, request
from datetime import datetime, date
import urllib.parse
import html
# Internal Modules
import server.data.mongo as db
# from server.data.logger import get_logger

#TODO: this should not be static
room_page = Blueprint('room_page', __name__, static_folder='../static')

@room_page.route('/create-room')
def room_collection():
    #create new room
    #TODO: decode JWT tokens once we know what is in them.
    
    input_dict = request.json
    room = Room.from_dict(input_dict)
    db.creat_room(room)
    # return validate_media(Book, db.insert_media, input_dict)

@room_page.route('/room/<str:username>', methods=['GET', 'PUT'])
#TODO: we definitely need to be able to view a room.

