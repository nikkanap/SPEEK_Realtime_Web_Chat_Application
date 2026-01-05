import './styles.css'
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>SPEEK Messaging Site</h1>
      <h2>Sign Up Page</h2>
      <label>
        Username
        <input type="text"></input>
      </label>
      <label>
        Email Address
        <input type="text"></input>
      </label>
      <label>
        Password
        <input type="password"></input>
      </label>
      <button>
        Sign In
      </button>
      <button onClick={() => navigate('/login')}>
        Already have an account? Log In.
      </button>
    </>
  )
}

export default SignupPage
