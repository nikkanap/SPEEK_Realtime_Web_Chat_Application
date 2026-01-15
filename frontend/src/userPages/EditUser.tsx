import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { loadPage } from './components/utils';

function EditUser() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userData:any = loadPage();
    setUsername(("username" in userData) ? userData.username : "error");
  }, []);

  // WORK ON THIS ONE NEXT
  const editInformation = () => {
    navigate("/edit_user");
  };

  return (
    <>
      <Header />
      <div className='chatContainer'>
        <p>Editing User Information</p>
        <p>{`Username: ${username}`}</p>
        <p>{`Email: ${email}`}</p>
      </div>
    </>
  )
}

export default EditUser
