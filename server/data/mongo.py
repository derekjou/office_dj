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

def _get_id():
    '''Retrieves the next id in the database and increments it.'''
    return _db.counter.find_one_and_update({'_id': 'COUNT'},
                                            {'$inc': {'count': 1}},
                                            return_document=ReturnDocument.AFTER)['count']

def add_user(input_user):
    '''a method to add a new user to the database'''
    _log.info("adding user to the database")
    new_user = input_user.to_dict()
    new_user['_id'] = _get_id()
    _db.users.insert_one(input_user.to_dict())
    _log.debug(input_user.to_dict())
    return input_user.to_dict()

def _get_user_class(status: str):
    '''Takes the status of a user and returns the matching class.'''
    output = None
    if status == 'user':
        output = User
    if status == 'dj':
        output = DJ
    if output is None:
        _log.error('Expected a status of a user, recieved %s.', status)
    return output

def login(username: str, password: str):
    '''A function that takes in a username and returns a user object with that
    username'''
    _log.info('Attempting to retrieve user %s from database.', username)
    query_dict = {'username': username, 'password':password}
    try:
        user_dict = _db.users.find_one(query_dict)
        # _log.debug(user_dict)
        if user_dict:
            class_name = _get_user_class(user_dict['role'])
            _log.debug(class_name.from_dict(user_dict))
        return user_dict if user_dict else None
    except:
        _log.info('Did not find %s in collection users.', username)
        raise

def add_room(room: object):
    '''Takes a room object and inserts it into the Rooms collection.'''
    _log.info('Attempting to add a new room %s to the database', room.name)
    try:
        _db.rooms.insert_one(room.to_dict())
        _log.info('Room %s successfully added', room.name)
    except errors.DuplicateKeyError: #duplicate username? unless we want djs to have multiple rooms.
        # TODO: return the error to the user
        pass

def get_room_by_name(user: str, name: str):
    '''Takes an id of a room object and queries the Rooms collection for that object.'''
    _log.info('Attempting to retrive room %s from the database')
    #TODO: Try/Except for empty find
    room = _db.rooms.find_one({'username': user, 'name': name})
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
    _db.users.drop()
    _db.rooms.drop()

    _db.counter.insert_one({'_id': 'UNIQUE_COUNT', 'count': 0})

    room_list = []
    room_list.append(Room(
        _get_id(),
        'Test Room',
        'victoria', 
        ['test1', 'test2', 'test3']
    ).to_dict())

    user_list = []
    user_list.append(DJ(
        _get_id(),
        'victoria',
        'pass',
        'Software Delivery',
        'UI/UX',
        'Delevoper'
    ).to_dict())

    _log.debug(user_list)

    _db.rooms.insert_many(room_list)
    _db.users.insert_many(user_list)
    _db.users.insert_one({'_id': _get_id(), 'username': 'user', 'password': 'pass', 'department': 'Engineering',
                          'functional_team': 'UI', 'title': 'Junior Developer'})
