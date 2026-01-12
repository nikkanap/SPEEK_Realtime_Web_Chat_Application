import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';

function Notifications() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

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

    loadPage();
  }, []);

  return (
    <>
      <Header />
      <div className='chatContainer'>
        
      </div>
    </>
  )
}

export default Notifications
