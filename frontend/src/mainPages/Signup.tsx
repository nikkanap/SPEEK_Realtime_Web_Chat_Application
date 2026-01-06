import Header from '../components/Header';
import './styles.css'
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate(); 
  
  return (
    <>
      <Header />
      <h1>SPEEK Messaging Site</h1>
      <h2>Sign Up Page</h2>
      <div className='inputsContainer'>
        <label>
          Username
          <input type='text'></input>
        </label>
        <label>
          Email Address
          <input type='text'></input>
        </label>
        <label>
          Password
          <input type='password'></input>
        </label>
      </div>
      
      <div className='buttonsContainer'>
        <button onClick={() => navigate('/chatpage')}>
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
