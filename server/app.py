from flask import Flask, escape, request, jsonify, make_response, render_template
from flask_cors import CORS

from server.model.users import User, DJ
<<<<<<< HEAD
from server.model.user_handler import user_page
from server.handlers.rooms import room_page
=======
from server.model.user_handler import user_page, admin_page
>>>>>>> 9298cce2cc106437ed7d0743af1e614860a79dfd
from server.data.logger import get_logger
import werkzeug

import server.data.mongo as db

_log = get_logger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

app.register_blueprint(user_page)
<<<<<<< HEAD
app.register_blueprint(room_page)
=======
app.register_blueprint(admin_page)
>>>>>>> 9298cce2cc106437ed7d0743af1e614860a79dfd

@app.route("/")
def home():
    return "home"

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        # getting the user information from the form and getting the information from the db
        _log.debug(request.form)
        user = db.login(request.form['login'], request.form['password'])
        if user:
            # Generate our token
            auth_token = user.encode_auth_token()
            _log.debug(dir(auth_token))
            response = make_response(jsonify(user))
            response.set_cookie('authorization', auth_token.decode())
            return response, 200
        return {}, 401

if __name__ == "__main__":
    app.run()
