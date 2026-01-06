import { Routes, Route } from 'react-router-dom';
import HomePage from './mainPages/HomePage';
import LoginPage from './mainPages/Login';
import SignupPage from './mainPages/Signup';
import AboutUs from './mainPages/AboutUs';
import Contact from './mainPages/Contact';
import ChatPage from './userPages/ChatPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chatpage" element={<ChatPage />} />
      </Routes>
  )
}

export default App
