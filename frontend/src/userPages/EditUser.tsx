import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { loadPage } from './components/utils';

function EditUser() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  

  useEffect(() => {
    loadPage().then(data => {
      setUsername(("username" in data) ? data.username : "error");
      setEmail(("email" in data) ? data.email : "error");
    });
  }, []);

  // WORK ON THIS ONE NEXT
  const saveUserData = () => {
    navigate("/edit_user");
  };

  const changePassword = () => {
    console.log("entering changePassword");
    openDialog();
  };

  const checkCurrentPassword = () => {
    //const res = await fetch(`${apiURL}`)
  }

  const openDialog = () => {
    if(dialogRef.current) dialogRef.current.showModal();
  }

  const closeDialog = () => {
    if(dialogRef.current) dialogRef.current.close();
  }

  return (
    <>
      <Header />
      <div className='chatContainer'>
        <p className='username'>Editing User Information</p>
        <div className='userInfo'>
          <label>
            Username
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div className='buttons'>
          <button onClick={changePassword}>
            Change Password
          </button>
          <button>
            Save
          </button>
        </div>
        
        <dialog ref={dialogRef}>
          <div className='dialogBox'>
            <p>Enter your current password:</p>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className='buttons'>
              
              <button onClick={checkCurrentPassword}>
                Submit
              </button>
              <button onClick={closeDialog}>
                Cancel
              </button>
            </div>
          </div>
          
        </dialog>
      
      </div>
    </>
  )
}

export default EditUser
