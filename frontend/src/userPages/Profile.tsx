import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';

function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadPage = async () => {
      const res = await fetch(`${apiURL}/user_data`, {
        headers: { "Content-Type" : "application/json" },
        credentials: "include"
      });

      const userData = await res.json();
      setUsername(userData.username);
      setEmail(userData.email);
    }

    loadPage();
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

  return (
    <>
      <Header />
      <div className='chatContainer'>
        <p>Profile</p>
        <p>{`Username: ${username}`}</p>
        <p>{`Email: ${email}`}</p>
        <div>
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
