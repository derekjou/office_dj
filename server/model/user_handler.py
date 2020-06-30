
from flask import Flask, jsonify, Blueprint, request
import html

import server.data.mongo as db
from server.data.logger import get_logger
from server.model.users import User, DJ


_log = get_logger(__name__)

user_page = Blueprint('user_page', __name__, static_folder='../static')

@user_page.route("/users/register", methods=['POST'])
def users():
    '''a method to handle requests to users'''
    if request.method == 'POST':
        input_dict = request.json
        _log.debug(input_dict)
        if input_dict['role']:
            db.add_user(DJ.from_dict(input_dict))
        else:
            db.add_user(User.from_dict(input_dict))