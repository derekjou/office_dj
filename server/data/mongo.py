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
    _log.debug(input_user.to_dict())
    return input_user.to_dict()