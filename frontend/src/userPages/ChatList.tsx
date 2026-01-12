import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';

function ChatList() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadPage = async () => {
      const res = await fetch(`${apiURL}/user_data`, {
        headers: { "Content-Type" : "application/json" },
        credentials: "include"
      });

      const userData = await res.json();
      setUsername(userData.username);
    }

    const getListOfUsers = async () => {
      const res = await fetch(`${apiURL}/get_users`, {
        headers: { "Content-Type" : "application/json" },
        credentials: "include"
      });

      const usersData = await res.json()
      setUsers(usersData.users);
    }

    loadPage();
    getListOfUsers();
  }, []);

  const selectUser = async (user: Array<number>) => {
    setMessage(`Hello, ${user}!`);

    const res = await fetch(`${apiURL}/select_chatmate`, {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userid : user[0],
        username : user[1]
      })
    });

    const success = await res.json()
    if (success.success) navigate("/chatpage");
  }

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
        <p>{message}</p>
      </div>
    </>
  )
}

export default ChatList
