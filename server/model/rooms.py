'''A module containing the model of a room.'''

# external imports
from datetime import datetime
import json
# internal imports
from server.data.logger import get_logger

_log = get_logger(__name__)

class Room():
    '''A class that defines information about the state of a room object.'''
    def __init__(self, db_id=-1, name='', owner='', participants=None, playlists=None, date_created=None):
        self._id = db_id 
        self.name = name
        self.owner = owner
        self.participants = participants if participants is not None else {}
        self.playlists = playlists if playlists is not None else {}
        self.date_created = date_created if date_created is not None else datetime.now()
        self.participant_requests = []

    def to_dict(self):
        '''Returns the dictionary representation of itself.'''
        return self.__dict__

    def set_id(self, db_id: int):
        '''Takes an id integer and sets the id of the room.'''
        self._id = db_id

    def get_id(self):
        '''Returns the room's id.'''
        return self._id

    def add_participant_request(self, user: object):
        '''Takes a user object, adds them to the participant_requests dict.'''
        _log.info('Adding %s to the participant request dict', user.username)
        today = {'date_requested': datetime.today()}
        u = user.to_dict()
        u.update(today)
        self.participant_requests.append(u)

    def approve_participant(self, user: object):
        '''Takes a user object, adds them to the participants dict and removes them 
           from the participant_requests dict.'''
        _log.info('Approving %s to the participants list', user.username)
        u = {user.username: user.to_dict()}
        self.participants.update(u)
        pop_this = None
        for i, request in enumerate(self.participant_requests):
            if request['username'] == user.username:
                pop_this = i
        self.participant_requests.pop(pop_this)

    def reject_participant(self, username: str):
        '''Takes a user object, removes them from the participant_requests dict.'''
        _log.info('Rejecting %s, removing from the request dict', username)
        pop_this = None
        for i, request in enumerate(self.participant_requests):
            if request['username'] == username: 
                pop_this = i
        self.participant_requests.pop(pop_this)

    @classmethod
    def from_dict(cls, input_user):
        '''Creates an instance of the class from a dictionary'''
        room = Room()
        room.__dict__.update(input_user)
        return room
