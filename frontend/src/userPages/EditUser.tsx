import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { apiURL, loadPage } from './components/utils';

function EditUser() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const confirmDialogRef = useRef<HTMLDialogElement | null>(null);
  const changePassDialogRef = useRef<HTMLDialogElement | null>(null);

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

  const checkCurrentPassword = async () => {
    const res = await fetch(`${apiURL}/confirm_current_password`, {
      method: "POST",
      headers: { "Content-Type" : "application/json" }, 
      credentials: "include",
      body: JSON.stringify({
        username,
        password: currentPassword
      })
    });

    const result = await res.json();
    if(result.success) {
      alert(result.message)
      closeDialog(confirmDialogRef, setMessage1);
      openDialog(changePassDialogRef);
    } else {
      setMessage1(result.message)
      setTimeout(() => {
        setMessage1("");
      }, 2000)
    }
  }

  const matchPasswords = async () => {
    let msg = "";
    if(newPassword === retypePassword) {
      const res = await fetch(`${apiURL}/change_password`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" }, 
        credentials: "include",
        body: JSON.stringify({
          username,
          password: newPassword
        })
      });

      const result = await res.json();
      if(result.success) {
        alert(result.message)
        closeDialog(changePassDialogRef, setMessage2);
        return;
      }
     
      msg = result.message
    } else msg = "New password and retyped password do not match.";
    setMessage2(msg);
    setTimeout(() => {
      setMessage2("");
    }, 3000)
  }

  // NOTE: make it so that the input elements are cleared each time dialog is opened up
  const openDialog = (dialog : React.RefObject<HTMLDialogElement | null>) => {
    if(dialog.current) dialog.current.showModal();
  }

  const closeDialog = (dialog : React.RefObject<HTMLDialogElement | null>, setMessage:React.Dispatch<React.SetStateAction<string>>) => {
    if(dialog.current) {
      dialog.current.close();
      setMessage("");
    }
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
          <button onClick={() => openDialog(confirmDialogRef)}>
            Change Password
          </button>
          <button>
            Save
          </button>
        </div>
        
        <dialog ref={confirmDialogRef}>
          <div className='dialogBox'>
            <p>Enter your current password:</p>
            <input 
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <p>
              {message1}
            </p>
            <div className='buttons'>
              <button onClick={checkCurrentPassword}>
                Submit
              </button>
              <button onClick={() => closeDialog(confirmDialogRef, setMessage1)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>


        <dialog ref={changePassDialogRef}>
          <div className='dialogBox'>
            <p className='username'>Change your password:</p>
            <div className='userInfo'>
              <label>
                New Password:
                <input 
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </label>
              <label>
                Retype Password:
                <input 
                  type="password"
                  value={retypePassword}
                  onChange={e => setRetypePassword(e.target.value)}
                />
              </label>
              <p>{message2}</p>
            </div>
            <div className='buttons'>
              <button onClick={matchPasswords}>
                Submit
              </button>
              <button onClick={() => closeDialog(changePassDialogRef, setMessage2)}>
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
