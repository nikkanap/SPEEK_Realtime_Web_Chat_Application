import { useState } from "react";
import Header from "../components/Header";
import "./styles.css"
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {  
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const apiURL = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    // send a post request
    const response = await fetch(`${apiURL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await response.json();
    setMessage(data.message);

    if(data.success) navigate("/chatpage"); 
  }
  
  return (
    <>
      <Header />
      <h1>SPEEK Messaging Site</h1>
      <h2>Log In Page</h2>
      
      <div className="inputsContainer">
        <label>
          Username
          <input 
            type="text"
            value={username}
            placeholder="username" 
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input 
            type="password"
            value={password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <p>{message}</p>
      </div>

      <div className="buttonsContainer">
        <button onClick={() => handleLogin()}>
          Log In
        </button>
        <Link to="/signup">
          Don"t have an account yet? Sign Up.
        </Link>
      </div>
    </>
  )
}

export default LoginPage
