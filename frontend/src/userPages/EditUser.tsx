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
    loadPage().then(data => {
      setUsername(("username" in data) ? data.username : "error");
      setEmail(("email" in data) ? data.email : "error");
    });
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
