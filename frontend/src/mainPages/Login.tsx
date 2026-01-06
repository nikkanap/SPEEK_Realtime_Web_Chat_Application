import Header from '../components/Header';
import './styles.css'
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {  
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <h1>SPEEK Messaging Site</h1>
      <h2>Log In Page</h2>
      
      <div className='inputsContainer'>
        <label>
          Username
          <input type='text'></input>
        </label>
        <label>
          Password
          <input type='password'></input>
        </label>
      </div>

      <div className='buttonsContainer'>
        <button onClick={() => navigate('/chatpage')}>
          Log In
        </button>
        <Link to='/signup'>
          Don't have an account yet? Sign Up.
        </Link>
      </div>
    </>
  )
}

export default LoginPage
