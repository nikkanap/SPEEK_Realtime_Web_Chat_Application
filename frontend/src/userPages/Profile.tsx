import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { loadPage } from './components/utils';

function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    loadPage().then(data => {
      setUsername(("username" in data) ? data.username : "error");
      setEmail(("email" in data) ? data.email : "error");
    });
  }, []);

  const logout = async () => {
    const res = await fetch(`${apiURL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    alert(data.message);

    if(data.success) navigate("/");
  }


  const deleteAccount = async () => {
    if(!confirm("This action will result in the removal of all your data. Proceed?")) {
      return;
    }
    const res = await fetch(`${apiURL}/delete_account`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    alert(data.message);

    if(data.success) navigate("/");
  }

  const editInformation = () => {
    navigate("/edit_user");
  };

  return (
    <>
      <Header />
      <div className='chatContainer'>
        <p>Profile</p>
        <p>{`Username: ${username}`}</p>
        <p>{`Email: ${email}`}</p>
        <div>
          <button onClick={() => deleteAccount()}>
            Edit Information
          </button>
          <button onClick={() => logout()}>
            Log Out
          </button>
          <button onClick={() => deleteAccount()}>
            Delete Account
          </button>
        </div>
      </div>
    </>
  )
}

export default Profile
