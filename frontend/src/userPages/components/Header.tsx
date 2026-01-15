import './header.css';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <div className='header'>
      <h2>SPEEK</h2>
      <div className='linkContainer'>
        <Link to='/chatlist'>Chat List</Link>
        <Link to='/notifications'>Notifications</Link>
        <Link to='/profile'>Profile</Link>
      </div>
    </div>
  )
}

export default Header
