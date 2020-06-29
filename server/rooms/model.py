'''A module containing the model of a room.'''

# external imports
from datetime import datetime
import json
# internal imports

class Room():
    '''A class that defines information about the state of a room object.'''
    def __init__(self, db_id=-1, owner='', participants=None, playlists=None):
        self._id = db_id
        self.owner = owner
        self.participants = participants if participants is not None else []
        self.playlists = playlists if playlists is not None else []
    
    def check_owner(self, owner):
        return self.owner == owner



