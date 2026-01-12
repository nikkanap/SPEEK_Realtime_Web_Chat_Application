import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

function ChatList() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  const apiURL = import.meta.env.VITE_API_URL;

  
  useEffect(() => {
    const loadPage = async () => {
      const res = await fetch(`${apiURL}/chatlist`, {
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

  return (
    <>
      <Header />
      <div className='chatContainer'>
        <p className='username'>{`Logged In As: ${username}`}</p>
        <p className='username'>Users</p>
        {
          users.map((user) => {
            return <p className="chatName" key={user}>{user}</p>;
          })
        }
      </div>
    </>
  )
}

export default ChatList
