import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

function ChatPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadPage = async () => {
      console.log("BEFORE RESPONSE")
      const response = await fetch(`${apiURL}/chat`, {
        method: "GET",
        headers: { "Content-Type" : "application/json" },
        credentials: "include"
      });

      console.log("AFTER RESPONSE")
      const userData = await response.json();

      console.log(userData)
      setUsername(userData.username);
    }

    loadPage();
  }, []);
  

  return (
    <>
      <Header />
      <table className='chatContainer'>
        <thead>
          <tr>
            <th>Users</th>
            <th>{`Me: ${username}`}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default ChatPage
