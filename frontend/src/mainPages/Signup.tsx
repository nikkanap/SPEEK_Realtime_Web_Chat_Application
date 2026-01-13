import { useState } from 'react';
import Header from '../components/Header';
import './styles.css'
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate(); 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState("");

  const apiURL = import.meta.env.VITE_API_URL;
  
  const handleSignup = async () => {
    const response = await fetch(`${apiURL}/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });

    const data = await response.json();
    setMessage(data.message);

    if(data.success) {
      alert(data.message)
      navigate('/chatlist');
    }
  }

  return (
    <>
      <Header />
      <h1>SPEEK Messaging Site</h1>
      <h2>Sign Up Page</h2>
      <div className='inputsContainer'>
        <label>
          Username
          <input 
            type='text'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email Address
          <input 
            type='text'
            placeholder='Email Address'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input 
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <p>{message}</p>
      </div>
      
      <div className='buttonsContainer'>
        <button onClick={() => handleSignup()}>
          Sign In
        </button>
        <Link to='/login'>
          Already have an account? Log In.
        </Link>
      </div>
    </>
  )
}

export default SignupPage
