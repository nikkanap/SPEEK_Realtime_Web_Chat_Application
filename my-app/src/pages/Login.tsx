import './styles.css'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  
  console.log("bruh");
  return (
    <>
      <h1>SPEEK Messaging Site</h1>
      <h2>Log In Page</h2>
      <label>
        Username
        <input type="text"></input>
      </label>
      <label>
        Password
        <input type="password"></input>
      </label>
      <button>
        Log In
      </button>
      <button onClick={() => navigate('/signup')}>
        Don't have an account yet? Sign Up.
      </button>
    </>
  )
}

export default LoginPage
