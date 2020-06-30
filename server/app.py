from flask import Flask, escape, request, jsonify

from server.model.users import User, DJ
from server.model.user_handler import user_page

app = Flask(__name__)
app.register_blueprint(user_page)


app.register_blueprint(room_page)

@app.route("/")
def home():
    return "home"



if __name__ == "__main__":
    app.run()
