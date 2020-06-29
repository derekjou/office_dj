'''A module for defining database operations.'''

# External imports
import os
from datetime import datetime, timedelta
from pymongo import MongoClient, errors, ReturnDocument

# Internal imports


try:
    _db = MongoClient(os.environ.get('MONGO_URI')).db
except:
    _log.exception('Could not connect to Mongo')
    raise

