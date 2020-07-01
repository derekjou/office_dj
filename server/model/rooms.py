'''A module containing the model of a room.'''

# external imports
from datetime import datetime
import json
# internal imports

class Room():
    '''A class that defines information about the state of a room object.'''
    def __init__(self, db_id=-1, name='', owner='', participants=None, playlists=None, date_created=None):
        self._id = db_id 
        self.name = name
        self.owner = owner
        self.participants = participants if participants is not None else []
        self.playlists = playlists if playlists is not None else []
        self.date_created = date_created if date_created is not None else datetime.now()
    def to_dict(self):
        '''Returns the dictionary representation of itself.'''
        return self.__dict__
    
    def set_id(self, db_id: int):
        '''Takes an id integer and sets the id of the room.'''
        self._id = db_id
    def get_id(self):
        '''Returns the room's id.'''
        return self._id


    @classmethod
    def from_dict(cls, input_user):
        '''Creates an instance of the class from a dictionary'''
        room = Room()
        room.__dict__.update(input_user)
        return room


