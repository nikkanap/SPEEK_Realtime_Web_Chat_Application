import './styles.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { getListOfUsers, loadPage, selectUser } from './components/utils';

function ChatList() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userData:any = loadPage();
    setUsername(("username" in userData) ? userData.username : "error");
  
    const userListData:any = getListOfUsers();
    setUsers(("users" in userData) ? userListData.users : "error");
  }, []);

  return (
    <>
      <Header />
      <div className='chatContainer'>
        <p className='username'>{`Logged In As: ${username}`}</p>
        <p className='username'>Users</p>
        {
          users.map((user) => {
            return <p 
              className="chatName" 
              key={user[0]}
              onClick={() => selectUser(user)}
            >{user[1]}</p>;
          })
        }
        <p className='subtext'>Click on a user to send them a message!</p>
      </div>
    </>
  )
}

export default ChatList
