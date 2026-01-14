import os

from db import runQuery 
from utils import generateID, generatePassHash, checkPassHash

from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room

# Flask for HTTP requests
app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY") # get the session key for the app

CORS(
    app, 
    origins=os.getenv("FRONTEND_URL"), # requests must come from this URL (frontend)
    supports_credentials=True
) # take note of the port here always

socketio = SocketIO(
    app,
    cors_allowed_origins=os.getenv("FRONTEND_URL"),
    manage_session=False,
    async_mode="threading", # allows the server to handle simultaneous network connections 
    logger=True,
    engineio_logger=True
)

#### NETWORKING ####
@socketio.on("connect")
def handle_connect():
    print("client connected.")  

@socketio.on("join")
def handle_join(data):
    room = data["room"]
    user = data["user"]
    print(f"{user} joining in room: {room}")
    join_room(room)

@socketio.on("message")
def handle_message(data):
    room = data["room"]

    outgoing = {
        "message" : f"{data["username"]}: { data["message"] }",
        "key" : generateID()
    }
    
    print("sending back message to room ", room)
    emit("message", outgoing, room=room)

# sets the user session
def setUserSession(username):
    user_data = runQuery(
        "SELECT userID, username, email FROM users WHERE username=%s",
        (username,)
    )["data"]
    session["user_id"] = user_data[0][0]
    session["username"] = user_data[0][1]
    session["email"] = user_data[0][2]

    session.permanent = True
    print("request.cookies: ", request.cookies)  # what cookies does each tab actually have?
    return 

def closeUserSession():
    session.pop("userid", None)
    session.pop("username", None)
    session.pop("email", None)
    session.pop("chatmate_userid", None)
    session.pop("chatmate_username", None)
    return  

##### HTTP REQUESTS #####
# HOMEPAGE
@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to SPEEK, a new chatting website."
    })

# LOGIN PAGE
@app.route("/login", methods=["POST"])
def confirmLogin():
    # Get data 
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Check if user and password matches
    user_check_query = "SELECT passwordhash FROM users WHERE username=%s"
    user_check_results = runQuery(
        user_check_query,
        (username,)
    ) 
    user_count = len(user_check_results["data"])

    # Set up server response
    success = False
    message = ""

    if user_count > 0:
        # Since result of fetchall is list of tuples, we get the first result of the list, then the first of the tuple
        stored_pass = user_check_results["data"][0][0]
        
        # Check stored password under username if it matches
        success = checkPassHash(password, stored_pass)
        message = "Logged in successfully!" if success else "Invalid login credentials."

        if success: 
            # Set the user session
            setUserSession(username)
    else:
        message = "User does not exist."

    # Send back to requesting page
    return jsonify({
        "success": success,
        "message": message
    })

# SIGNUP PAGE
@app.route("/signup", methods=["POST"])
def confirmSignup(): 
    # Get data
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Check for existing users
    select_query = "SELECT userID FROM users WHERE username=%s"
    select_results = runQuery(
        select_query,
        (username,)
    )
    user_count = len(select_results["data"])

    # If user exists, respond back that username is already being used
    if user_count > 0:
        return jsonify({
            "success": False,
            "message": "Username is already being used."
        })

    # If user DNE:
    user_ID = generateID()
    password_hash = generatePassHash(password)

    # Add user to database
    insert_query = "INSERT INTO users (userID, username, email, passwordhash) VALUES (%s, %s, %s, %s)"
    insert_results = runQuery(
        insert_query,
        (user_ID, username, email, password_hash), 
        False
    )

    # Return reponse for adding new user
    success = insert_results["success"]
    if success:
        setUserSession(username)

    return jsonify({
        "success": success,
        "message": f"User {username} is officially signed in!" if success 
                    else f"An error has occurred while adding new user." 
    })
    
# GETTING USER DATA
@app.route("/user_data", methods=["GET"])
def getUserData():
    if "user_id" not in session:
        print("USER NOT LOGGED IN")
        return jsonify({
            "message" : "User is not logged in."
        })

    return jsonify({
        "user_id" : session["user_id"],
        "username" : session["username"],
        "email" : session["email"],
        "message" : "Successfully logged into account!"
    })

# DELETING USER
@app.route("/delete_account", methods=["POST"])
def deleteAccount(): 
    if "user_id" not in session:
        print("USER NOT LOGGED IN")
        return jsonify({
            "message" : "User is not logged in."
        })
    
    data = runQuery(
        "DELETE FROM users WHERE userid=%s",
        (session["user_id"],),
        False
    )

    if data["success"]:
        closeUserSession()

    return jsonify({
        "success" : data["success"]
    })

# GETTING LIST OF USERS
@app.route("/get_users", methods=["GET"])
def getUsers():
    if "username" not in session:
        print("USER NOT LOGGED IN")
        return jsonify({
            "message" : "User is not logged in."
        })
    
    username = session["username"]
    usersData = runQuery(
        "SELECT userid, username FROM users WHERE not username=%s",
        (username,)
    )["data"]

    return jsonify({
        "users" : usersData
    })

# SAVING SELECTED CHATMATE
@app.route("/select_chatmate", methods=["POST"])
def selectChatmate():
    print("Getting chatmate info")
    if "username" not in session:
        print("USER NOT LOGGED IN")
        return jsonify({
            "message" : "User is not logged in."
        })
    
    data = request.json

    session["chatmate_id"] = data.get("userid")
    session["chatmate_username"] = data.get("username")
    
    print("saved user ", session["chatmate_username"])
    return jsonify({
        "success" : True
    })

# GETTING DATA OF SELECTED CHATMATE
@app.route("/get_chatmate", methods=["GET"])
def getChatmate():
    if "user_id" not in session:
        print("USER NOT LOGGED IN")
        return jsonify({
            "message" : "User is not logged in."
        })
    
    if "chatmate_id" not in session:
        print("NO SELECTED USER TO CHAT")
        return jsonify({
            "message" : "No user selected to chat."
        })
    
    print(session["chatmate_id"])
    return jsonify({
        "userid" : session["chatmate_id"],
        "username" : session["chatmate_username"]
    })

# LOGGING OUT 
@app.route("/logout", methods=["POST"])
def logOutUser():
    if "user_id" not in session:
        print("USER NOT LOGGED IN")
        return jsonify({
            "message" : "User is not logged in."
        })
    closeUserSession()

    return jsonify({
        "success" : True,
        "message" : "Successfully logged out user!"
    })

if __name__ == "__main__":
    """
    instead of using:
    > app.run(port=5001, debug=True, use_reloader=False)
    we use:
    > socketio.run(app, host="0.0.0.0", port=5001)
    because this runs both flask AND handles web socket connections
    """
    socketio.run(
        app,    
        host="0.0.0.0",     # accessible to multiple devices in the same LAN
        port=5001,          # port of the server
        debug=False,         # allow debugging prints
        use_reloader=True   # server restarts automatically so any changes made restarts the server
    )