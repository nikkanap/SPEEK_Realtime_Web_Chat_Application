import pg8000 # type: ignore

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv 
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"]) # take note of the port here always

# HOMEPAGE
@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to SPEEK, a new chatting website."
    })

# LOGIN PAGE
@app.route("/login", methods=["POST"])
def confirmLogin():
    # get the data 
    data = request.json

    username = data.get("username")
    passsword = data.get("password")
    
    # set up the response
    success = username == "test" and passsword == "123"
    message = "Login Successful!" if success else "Invalid Credentials!"

    print(success)
    print(message)

    # send the response
    return jsonify({
        "success": success,
        "message": message
    })

# SIGNUP PAGE
@app.route("/signup", methods=["POSt"])
def confirmSignup(): 
    data = request.json

    username = data.get("username")
    email = data.get("email")
    passsword = data.get("password")
    
    # set up the response
    success = True # username == "test" and passsword == "123"
    message = "Signup Successful!" if success else "Invalid Signup!"

    print(success)
    print(message)

    # send the response
    return jsonify({
        "success": success,
        "message": message
    })






# getting the data from the database through the config file
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = int(os.getenv("DB_PORT", 5432)) #if waray, use 5432

print(DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT)


db_connection = None
try:
    db_connection = pg8000.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT
    )
    print("Connection successful!")

    cursor = db_connection.cursor()
    query = "SELECT * FROM users;"
    cursor.execute(query)
    records = cursor.fetchall()

    print("Users: ")
    for record in records:
        print(record)
    
    cursor.close()

except Exception as e:
    print("An error has occured while trying to connect to the database: ", e)
finally:
    if db_connection:
        db_connection.close()

if __name__ == "__main__":
    app.run(port=5001, debug=True)