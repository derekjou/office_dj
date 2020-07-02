'''A module for defining database operations.'''

# External imports
import os
from datetime import datetime, timedelta
from pymongo import MongoClient, errors, ReturnDocument

# Internal imports
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
    query_dict = {'user_name': username, 'password':password}
    try:
        user_dict = _db.users.find_one(query_dict)
        if user_dict:
            class_name = _get_user_class(user_dict['role'])
            _log.debug(str(class_name.from_dict(user_dict)))
        return class_name.from_dict(user_dict) if user_dict else None
    except:
        _log.info('Did not find %s in collection users.', username)
        raise
