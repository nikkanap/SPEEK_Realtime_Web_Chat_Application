import { useState } from "react";
import Header from "../components/Header";
import "./styles.css"
import { Link, useNavigate } from "react-router-dom";
import { apiURL } from "../userPages/components/utils";

function LoginPage() {  
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

    console.log("finished sending post request");
    const data = await response.json();
    console.log("data: " + data);
    setMessage(data.message);

    if(data.success) {
      alert(data.message);
      navigate("/chatlist"); 
    }
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
        <button onClick={handleLogin}>
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
