import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <h1>SPEEK Messaging Site</h1>
      <p className='read-the-docs'>
        Welcome to SPEEK, a new chatting website.
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
