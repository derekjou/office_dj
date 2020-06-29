'''A module for defining database operations.'''

# External imports
import os
from datetime import datetime, timedelta
from pymongo import MongoClient, errors, ReturnDocument

# Internal imports
from server.rooms.model import Room

try:
    _db = MongoClient(os.environ.get('MONGO_URI')).db
except:
    _log.exception('Could not connect to Mongo')
    raise



def create_room()

def _get_id():
    '''Retrieves the next id in the database and increments it.'''
    return _db.counter.find_one_and_update({'_id': 'UNIQUE_COUNT'},
                                           {'$inc': {'count': 1}},
                                           return_document=ReturnDocument.AFTER)['count']

if __name__ == "__main__":
    _db._las.rooms.drop()

    room_list = []
    room_list.append(Room(_db._get_id(), 'testdj', ['testuser1', 'testuser2']).to_dict())
