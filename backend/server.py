import string 
import random

from flask import Flask, request, jsonify, session
from flask_cors import CORS

from dotenv import load_dotenv 

from passlib.hash import bcrypt
from psycopg2.pool import ThreadedConnectionPool
import os

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
# allowing only from localhost:3000 to listen in
CORS(app, origins=["http://localhost:3000"]) # take note of the port here always

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

def checkPassHash(password, passwordhash):
    return bcrypt.verify(password, passwordhash)

def setUserSession(username):
    user_data = runQuery(
        "SELECT * FROM users where username=%s",
        (username,)
    )[0]
    session["user_id"] = user_data[0]
    session["username"] = user_data[1]
    session["email"] = user_data[2]

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
            setUserSession(username)
    else:
        message = "User does not exist."

    # Send back to requesting page
    return jsonify({
        "success": success,
        "message": message
    })

# SIGNUP PAGE
@app.route("/signup", methods=["POSt"])
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
    
# CHAT PAGE
@app.route("/chat", methods=["POST"])
def chat():
    if "user_id" not in session:
        return jsonify({
            "error" : "User is not logged in."
        })
    user_data = (session["user_id"], session["username"], session["email"])
    
    return jsonify({
        "user-data" : user_data,
        "message" : "Successfully logged into account!"
    })


if __name__ == "__main__":
    app.run(port=5001, debug=True)