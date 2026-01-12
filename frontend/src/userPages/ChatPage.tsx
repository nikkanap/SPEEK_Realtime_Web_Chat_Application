import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

function ChatPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [chatmate, setChatmate] = useState({});

  const apiURL = import.meta.env.VITE_API_URL;
  const socket = io("http://localhost:5000", {
    withCredentials: true,
    transports: ["websockets"], // important. always add this
  });

  useEffect(() => {
    const loadPage = async () => {
      const res = await fetch(`${apiURL}/user_data`, {
        headers: { "Content-Type" : "application/json" },
        credentials: "include"
      });

      const userData = await res.json();
      setUsername(userData.username);
    }

    const getChatmate = async () => {
      const res = await fetch(`${apiURL}/get_chatmate`, {
        headers: { "Content-Type" : "application/json"},
        credentials: "include"
      });
      
      const chatmateData = await res.json();
      setChatmate(chatmateData);
      console.log(chatmateData);
    }

    const joinRoom = () => {
      socket.emit("join", { room: "room1" });
      socket.emit("message", {
        room: "room1",
        message: "Hello from client A"
      });
      socket.on("message", (msg) => {
        console.log("Received:", msg);
      })
    };

    loadPage();
    getChatmate();
    joinRoom();
  }, []);

  return (
    <>
      <Header />
      <div className='chatContainer'>
        <p className='username'>{`Logged In As: ${username}`}</p>
        <p>{`Chatting with: ${ ("username" in chatmate) ? chatmate["username"] : "no user"}`}</p>
        <div className='chatArea'>

        </div>
      </div>
    </>
  )
}

export default ChatPage
