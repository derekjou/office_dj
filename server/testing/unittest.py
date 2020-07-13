import unittest
from unittest.mock import patch
import pymongo
from server.model.rooms import Room
from server.model.users import User, DJ, Admin
from server.songs.model import Song
import server.data.mongo


class UserModel(unittest.TestCase):
    '''a class for testing user models'''
    def test_user(self):
        '''a method for testing the user model'''
        user = User(1, 'user', 'pass', 'dep', 'funcTeam', 'title')
        self.assertEqual(user._id, 1)
        self.assertEqual(user.username, 'user')
        self.assertEqual(user.password, 'pass')
        self.assertEqual(user.department, 'dep')
        self.assertEqual(user.functional_team, 'funcTeam')
        self.assertEqual(user.title, 'title')
        self.assertEqual(user.role, 'user')

    def test_dj(self):
        '''a method for testing the DJ model'''
        dj = DJ(1, 'user', 'pass', 'dep', 'funcTeam', 'title', 'DJ')
        self.assertEqual(dj._id, 1)
        self.assertEqual(dj.username, 'user')
        self.assertEqual(dj.password, 'pass')
        self.assertEqual(dj.department, 'dep')
        self.assertEqual(dj.functional_team, 'funcTeam')
        self.assertEqual(dj.title, 'title')
        self.assertEqual(dj.role, 'DJ')

    def test_admin(self):
        '''a method to test the Admin model'''
        admin = Admin(1, 'user', 'pass', 'admin')
        self.assertEqual(admin._id, 1)
        self.assertEqual(admin.username, 'user')
        self.assertEqual(admin.password, 'pass')
        self.assertEqual(admin.role, 'admin')
        
class Song_Test(unittest.TestCase):
    '''A class to test the Song model'''
    def test_song(self):
        '''a method to test the song model'''
        song = Song(db_id=1, title='title', album='album', artists=['a', 'b'], genre='genre', url='test', album_url='test')
        self.assertEqual(song._id, 1)
        self.assertEqual(song.title, 'title')
        self.assertEqual(song.album, 'album')
        self.assertEqual(song.artists[0], 'a')
        self.assertEqual(song.genre, 'genre')
        self.assertEqual(song.url, 'test')
        self.assertEqual(song.album_url, 'test')

class Room_Test(unittest.TestCase):
    '''A class to test the Room model'''
    def test_Room(self):
        '''a method to test the Room model'''
        room = Room(db_id=1, name='name', owner='owner', participants='a', playlist='1', date_created='a')
        self.assertEqual(room._id, 1)
        self.assertEqual(room.name, 'name')
        self.assertEqual(room.owner, 'owner')
        self.assertEqual(room.participants, 'a')
        self.assertEqual(room.playlist, '1')
        self.assertEqual(room.date_created, 'a')


if __name__ == '__main__':
    unittest.main()
