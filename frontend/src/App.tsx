import { Routes, Route } from 'react-router-dom';
import HomePage from './mainPages/HomePage';
import LoginPage from './mainPages/Login';
import SignupPage from './mainPages/Signup';
import AboutUs from './mainPages/AboutUs';
import Contact from './mainPages/Contact';
import ChatList from './userPages/ChatList';
import ChatPage from './userPages/ChatPage';
import Profile from './userPages/Profile';
import Notifications from './userPages/Notifications';
import EditUser from './userPages/EditUser';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit_user" element={<EditUser />} />
      </Routes>
  )
}

export default App
