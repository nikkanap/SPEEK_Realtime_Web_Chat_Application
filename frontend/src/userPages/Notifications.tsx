import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { loadPage } from './components/utils';

function Notifications() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    loadPage().then(data => {
      setUsername(("username" in data) ? data.username : "error");
    });
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
