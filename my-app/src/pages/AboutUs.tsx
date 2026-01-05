import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <h1>About</h1>
      <p className="read-the-docs">
        SPEEK is a chat website developed for the purpose of being able to chat with people!
      </p>
      <p>
        The developer is named Nikka Naputo.
      </p>
      <Link to="/">
        Some link here
      </Link>
    </>
  )
}

// work on issue:
// route not working going from homepage to login and signup pages

export default AboutUs
