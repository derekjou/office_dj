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

def _get_id():
    '''Retrieves the next id in the database and increments it.'''
    return _db.counter.find_one_and_update(
        {'_id': 'UNIQUE_COUNT'},
        {'$inc': {'count': 1}},
        return_document=ReturnDocument.AFTER
    )['count']

if __name__ == "__main__":
    _log.info('Running Mongo script: dropping collections from _library database')
    _log.info(_db.list_collection_names())
    _db.counter.drop()
    _db.rooms.drop()

    _db.counter.insert_one({'_id': 'UNIQUE_COUNT', 'count': 0})

    room_list = []
    room_list.append(Room(
        _get_id(),
        'Test Room',
        'test_dj', 
        ['test_user_1', 'test_user_2', 'test_user_3']
    ).to_dict())

    _db.rooms.insert_many(room_list)
