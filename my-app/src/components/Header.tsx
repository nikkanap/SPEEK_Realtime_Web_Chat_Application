import './header.css';
import { Link, useNavigate } from 'react-router-dom';

function Header() {

  return (
    <div className="header">
      <h2>SPEEK</h2>
      <div className="linkContainer">
        <Link to="/">Home</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  )
}

export default Header
