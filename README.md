# SPEEK_Realtime_Web_Chat_Application
This is going to me my personal project in the Christmas Break before the 2nd Semester occurs.

## Application Description
SPEEK is going to be a real-time chat web application where users can register an account and start chatting with other fellow users!

> [!UPDATE]  Shifted to a Linux Distro (Ubuntu) but most likely most of the code presented in this documentation will be the same

## Technology Stack:
### I. **Frontend: Vite + React**
#### Creating a Vite Project:
Enter the code to create the my-app vite project:
`npm create vite@latest my-app -- --template react-ts`

> [!NOTE]
> If an npm warning occurs where node_modules are to be deleted:
1. `cd my-app`
2. Manually delete node_modules
3. `npm install`

#### Running Vite React Project:
1. Enter the "frontend" directory: `cd frontend` 
2. `npm run dev`

#### Adding a React Router Library for Navigation Between Pages:
`npm install react-router-dom`

Then go to App.tsx and add the pages in the `<BrowserRouter>` element .

### II. Backend Framework: Python + Flask 
1. Created a .env file containing database content (added it to .gitignore)
2. Created a venv for the python packages needed for the project: `python3 -m venv [name_of_env]`
3. Installed all the required packages for the program like flask, dotenv, etc.

#### Installed Libraries:
1. flask - for handling HTTP requests: 
`pip install flask`
2. flask_cors - handles cross-origin resource sharing (different ports): 
`pip install flask-cors`
3. lask_socketio - can be used to run the app; also handles websockets: 
`pip install flask-socketio`
4. psycopg2.pool - where psycopg2 is the python database driver for psql, and psycopg2.pool allows reusing of connections instead of opening and closing multiple connections to the db: 
`pip install psycopg2-binary`
5. passlib.hash - specifically bcrypt for hashing user passwords: 
`pip install passlib(bcrypt)`

#### Running Server:
1. Enter the "backend" directory: `cd backend`
2. Turn on virtual environment: `source ./venv/bin/activate`
3. Run the server: `python server.py`

### III. Database: PostgreSQL
What I did was:
- Install postgresql using
`sudo apt install postgresql postgresql-contrib -y`
Then I logged in, added a password, and created "speekdb", the database for SPEEK. I saved the database information into an .env file (added to .gitignore). 

## Ports and Host:
+ **Frontend Port:** 3000 (changed from vite default of 5173)
+ **Backend Port:** 5001 (changed from flask default of 5000)

## Features/Requirements:
### User Management:
- [x] The user must be able to register an account 
- [x] The user must be able to login to an existing account
- [x] The user must be able to log out of their account after use
- [ ] The user must be able to delete their account if they wish to
- [ ] When deleting an account, all instances of the user's data from the database must be deleted
- [ ] The user must be able to modify their user information
- [ ] The user must be able to add a profile picture
- [ ] The user must be able to remove a profile picture
- [ ] The user must be able to modify their password

### Messaging
- [x] The user must be able to select a user to chat with
- [ ] The user must be able to receive messages from another user
- [ ] The user must be able to send messages to another user
- [ ] The user must be able to delete individual messages
- [ ] The user must be able to archive chats
- [ ] Messages must be retained in their respective user chats

### Notifications
- [ ] The user must be able to receive message notifications
- [ ] The user must be able to read their notifications
- [ ] Notifications must be maintained in their notifications inbox

### Additional Notes (Technical):
- [x] User passwords must be hashed before saving to the database (use bcrypt)



