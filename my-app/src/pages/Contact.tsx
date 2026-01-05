import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Contact() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <h1>Contact Us</h1>
      <p className="read-the-docs">
        Feel free to reach out to us for further inquiries.
      </p>
      <Link to="/">
        Some link here
      </Link>
    </>
  )
}

// work on issue:
// route not working going from homepage to login and signup pages

export default Contact
