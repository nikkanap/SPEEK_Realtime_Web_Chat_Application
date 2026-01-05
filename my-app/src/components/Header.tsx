import './styles.css';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>SPEEK</h1>
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link>
    </>
  )
}

export default HomePage
