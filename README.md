# SPEEK_Realtime_Web_Chat_Application
This is going to me my personal project in the Christmas Break before the 2nd Semester occurs.

## Application Description
SPEEK is going to be a real-time chat web application where users can register an account and start chatting with other fellow users!

## Technology Stack:
+ **Frontend: Vite + React**
### Creating a Vite Project:
Enter the code to create the my-app vite project:
`npm create vite@latest my-app -- --template react-ts`

> [!NOTE]
> If an npm warning occurs where node_modules are to be deleted:
1. `cd my-app`
2. Manually delete node_modules
3. `npm install`

### Running Vite React Project:
`npm run dev`

### Adding a React Router Library for Navigation Between Pages:
`npm install react-router-dom`

Then you go to App.tsx and add the pages in the `<BrowserRouter>` element 


+ Backend Framework: Python + FastAPI 
+ API Architecture: REST
+ Database: PostgreSQL

## Features/Requirements:
### User Management:
+ The user must be able to register an account
+ The user must be able to login to an existing account
+ The user must be able to log out of their account after use
+ The user must be able to delete their account if they wish to
+ When deleting an account, all instances of the user's data from the database must be deleted
+ The user must be able to modify their user information
+ The user must be able to add a profile picture
+ The user must be able to remove a profile picture
+ The user must be able to modify their password

### Messaging
+ The user must be able to receive messages from another user
+ The user must be able to send messages to another user
+ The user must be able to delete individual messages
+ The user must be able to archive chats
+ Messages must be retained in their respective user chats

### Notifications
+ The user must be able to receive message notifications
+ The user must be able to read their notifications
+ Notifications must be maintained in their notifications inbox

### Additional Notes (Technical):
+ User passwords must be hashed before saving to the database (use bcrypt)



