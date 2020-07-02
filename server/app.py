from flask import Flask, escape, request, jsonify
from flask_cors import CORS

from server.model.users import User, DJ
from server.model.user_handler import user_page

app = Flask(__name__)
CORS(app)
app.register_blueprint(user_page)

@app.route("/")
def home():
    return "home"

if __name__ == "__main__":
    app.run()