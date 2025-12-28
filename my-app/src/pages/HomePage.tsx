import './styles.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>SPEEK Messaging Site</h1>
      <p className="read-the-docs">
        Welcome to SPEEK, a new chatting website.
      </p>
      <button onClick={() => navigate('/login')}>
        Log In
      </button>
      <button onClick={() => navigate('/signup')}>
        Sign Up
      </button>
    </>
  )
}

// work on issue:
// route not working going from homepage to login and signup pages

export default HomePage
