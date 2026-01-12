import string 
import random
import os

from flask import Flask, request, jsonify, session
from flask_cors import CORS

from dotenv import load_dotenv 

from passlib.hash import bcrypt
from psycopg2.pool import ThreadedConnectionPool

# loading the database information from the .env file
load_dotenv()

# getting the data from the database through the config file
pool = ThreadedConnectionPool(
    minconn=1,
    maxconn=10,
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),  
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT"))
)

# Flask for HTTP requests
app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY") # get the session key for the app

# allowing only from localhost:3000 to listen in
CORS(
    app, 
    supports_credentials=True,
    origins=["http://localhost:3000"] # requests must come from this URL (frontend)
) # take note of the port here always


##### DATABASE #####

# modify this later AFTER creating signup page that has hashed passwords
def runQuery(query, params=None, fetch=True):
    # Get a connection to the db
    db_connection = pool.getconn()

    # returning values
    success = False
    data = ()

    try:
        with db_connection.cursor() as cursor:
            cursor.execute(query, params)

            if fetch: # if we need to get any results
                data = cursor.fetchall() or ()
            
            # if no results
            db_connection.commit()
            success = True # if successful, then we set success to true

    except Exception as e:
        db_connection.rollback()
        print('An exception occurred', e)
        raise # raise the exception

    finally:
        # give the connection back regardless of results
        pool.putconn(db_connection)

        # return a dict
        return {
            "data" : data,
            "success" : success
        } 

##### GENERATING USERIDS AND PASSWORD HASHING #####
# generates a userID of size 10
def generateUserID(size=10, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

# generates a hash of the password string
def generatePassHash(password):
    return bcrypt.hash(password)

# matches the password
def checkPassHash(password, passwordhash):
    return bcrypt.verify(password, passwordhash)

# sets the user session
def setUserSession(username):
    user_data = runQuery(
        "SELECT userID, username, email FROM users WHERE username=%s",
        (username,)
    )["data"]
    print("user data: ", user_data)
    session["user_id"] = user_data[0][0]
    session["username"] = user_data[0][1]
    session["email"] = user_data[0][2]

    print("user_id: ", session["user_id"])
    print("username: ", session["username"])
    print("email: ", session["email"])
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
    user_ID = generateUserID()
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
    return jsonify({
        "success": success,
        "message": f"User {username} is officially signed in!" if success 
                    else f"An error has occurred while adding new user." 
    })
    
# CHAT LIST PAGE
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

@app.route("/get_users", methods=["GET"])
def getUsers():
    print("Getting user list")
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


if __name__ == "__main__":
    # app.config["SESSION_TYPE"] = "filesystem"
    app.run(port=5001, debug=True, use_reloader=False)