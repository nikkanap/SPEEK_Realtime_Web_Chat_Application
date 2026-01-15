import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { apiURL } from '../userPages/components/utils';

function HomePage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const getMessage = async () => {
      const response = await fetch(`${apiURL}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      setMessage(data.message);
    }

    getMessage();
  }, []) ;

  return (
    <>
      <Header />
      <h1>SPEEK Messaging Site</h1>
      <p className='read-the-docs'>
        {message}
      </p>
      <div className='homepageButtons'>
        <button onClick={() => navigate('/login')}>
          Log In
        </button>
        <button onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
    </>
  )
}

export default HomePage
