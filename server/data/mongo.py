'''A module for defining database operations.'''

# External imports
import os
from datetime import datetime, timedelta
from pymongo import MongoClient, errors, ReturnDocument

# Internal imports


try:
    _las = MongoClient(os.environ.get('MONGO_URI')).las
except:
    _log.exception('Could not connect to Mongo')
    raise
