'''A module for defining database operations.'''

# External imports
import os
from datetime import datetime, timedelta
from pymongo import MongoClient, errors, ReturnDocument

# Internal imports
from server.model.rooms import Room
from server.model.users import User, DJ
from server.data.logger import get_logger

_log = get_logger(__name__)


try:
    _db = MongoClient(os.environ.get('MONGO_URI')).db
except:
    _log.exception('Could not connect to Mongo')
    raise



def add_user(input_user):
    '''a method to add a new user to the database'''
    _log.info("adding user to the database")
    _db.users.insert_one(input_user.to_dict())


def add_room(room: object):
    '''Takes a room object and inserts it into the Rooms collection.'''
    _log.info('Attempting to add a new room %s to the database', room.name)
    try:
        _db.rooms.insert_one(room.to_dict())
        _log.info('Room %s successfully added', room.name)
    except errors.DuplicateKeyError: #duplicate username? unless we want djs to have multiple rooms.
        # TODO: return the error to the user
        pass

def get_room_by_id(id: int):
    '''Takes an id of a room object and queries the Rooms collection for that object.'''
    _log.info('Attempting to retrive room %s from the database')
    #TODO: Try/Except for empty find
    room = _db.rooms.find_one({'_id': id})
    _log.info('Room %d successfully found', id)
    return room
