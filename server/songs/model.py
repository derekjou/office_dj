'''A module containing the model of a room.'''

# external imports
import json
# internal imports

class Song():
    '''A class that defines information about the state of a room object.'''
    def __init__(self, db_id=-1, title='', album='', artists=[], genre='', url=''):
        self._id = db_id
        self.title = title
        self.album = album
        self.artists = artists if artists is not None else []
        self.genre = genre
        self.url = url

    def to_dict(self):
        '''reutrns a dictionary deffinition of itself'''
        return self.__dict__

    @classmethod
    def from_dict(cls, input_user):
        '''takes an input dictionary and returns a user'''
        song = Song()
        song.__dict__.update(input_user)
        return song



