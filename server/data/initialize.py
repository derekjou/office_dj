'''A development module for defining initial database conditions.'''

# External imports
import os, sys
sys.path.append(os.path.abspath(os.path.join('..')))

from datetime import datetime, timedelta
from pymongo import MongoClient, errors, ReturnDocument
from bson.son import SON

# Interal imports
from server.data.mongo import _db, _get_id, _get_song_number
from server.model.users import User, DJ, Admin
from server.songs.model import Song
from server.model.rooms import Room
from server.data.logger import get_logger

_log = get_logger(__name__)

if __name__ == "__main__":
    _log.info('Running Initialize script: dropping collections from _library database')
    _log.info(_db.list_collection_names())
    _db.counter.drop()
    _db.users.drop()
    _db.rooms.drop()
    _db.song_numbers.drop()
    _db.songs.drop()

    _db.counter.insert_one({'_id': 'COUNT', 'count': 0})
    _db.counter.insert_one({'_id': 'UNIQUE_SONG_NUMBER', 'count': 0})


    # USERS #

    user_list = []
    user_list.append(DJ(
        _get_id(),
        'discjockey',
        'pass',
        'Software Delivery',
        'UI/UX',
        'Delevoper'
    ).to_dict())
    user_list.append(User(
        _get_id(), 
        'user', 
        'pass', 
        'Engineering',
        'UI', 
        'Junior Developer'
    ).to_dict())
    user_list.append(Admin(
        _get_id(),
        'admin',
        'pass'
    ).to_dict())


    # SONGS #

    song_list = []
    song_list.append(Song(
        _get_song_number(),
        "La Mujer de Antonio",
        "SONGO 21 - Studio sessions 2003",
        ["SONGO 21"],
        "Salsa",
        "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/SONGO_21/SONGO_21_-_Studio_sessions_2003/SONGO_21_-_02_-_La_Mujer_de_Antonio.mp3"
    ).to_dict())
    song_list.append(Song(
        _get_song_number(),
        "Despacito",
        "Vida",
        ["Luis Fonsi", "Daddy Yankee"],
        "Pop",
        "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3"
    ).to_dict())
    song_list.append(Song(
        _get_song_number(),
        'Y Hubo Alguien',
        'Contra La Corriente',
        ['Marc Anthony'],
        'Salsa',
        'someurl.mp3'
    ).to_dict())


    # ROOMS #

    room_list = []
    room_list.append(Room(
        _get_id(),
        'Test Room',
        'discjockey',
        {'discjockey': user_list[0], 'test1': 1, 'test2': 2, 'test3': 3},
        {'playlist': [Song(1, "Despacito", "Vida", ["Luis Fonsi", "Daddy Yankee"], "Pop","http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3").to_dict(),
         Song(2, "La Mujer de Antonio", "SONGO 21 - Studio sessions 2003", ["SONGO 21"], "Salsa", "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/SONGO_21/SONGO_21_-_Studio_sessions_2003/SONGO_21_-_02_-_La_Mujer_de_Antonio.mp3").to_dict()],
         'currentTime': 10}
    ).to_dict())
    room_list.append(Room(
        _get_id(),
        'AaaaaBBb',
        'discjockey',
        {'discjockey': user_list[0], 'test1': 1, 'test2': 2, 'test3': 3}
    ).to_dict())
    room_list.append(Room(
        _get_id(),
        'Alacazam',
        'discjockey',
        {'discjockey': user_list[0], 'test1': 1, 'test2': 2, 'test3': 3}
    ).to_dict())
    room_list.append(Room(
        _get_id(),
        'Zampowbop',
        'discjockey',
        {'discjockey': user_list[0], 'test1': 1, 'test2': 2, 'test3': 3}
    ).to_dict())
    room_list.append(Room(
        _get_id(),
        'razzamatazz',
        'discjockey',
        {'discjockey': user_list[0], 'test1': 1, 'test2': 2, 'test3': 3}
    ).to_dict())

    _log.debug(user_list)
    _log.debug(song_list)
    _log.debug(room_list)

    _db.rooms.insert_many(room_list)
    _db.songs.insert_many(song_list)
    _db.users.insert_many(user_list)
