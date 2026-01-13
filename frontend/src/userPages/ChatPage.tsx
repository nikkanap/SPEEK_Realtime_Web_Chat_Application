import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

type MsgType = {
  message: string,
  key: string
}

function ChatPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [chatmate, setChatmate] = useState({});
  const [messages, setMessages] = useState<MsgType[]>([]);
  const [chatMessage, setChatMessage] = useState("");

  const apiURL = import.meta.env.VITE_API_URL;

  // socket operations
  const socket = io(import.meta.env.VITE_API_URL, {
    withCredentials: true,
    transports: ["websocket"], // important. always add this
  });

  // function for updating messages
  const updateMessages = (msg:MsgType) => {
    setMessages(prev => [...prev, msg]);
  };

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
    }

    loadPage();
    getChatmate();
  }, []);

  useEffect(() => {
     const joinRoom = async () => {
      socket.on("connect", () => {
        console.log("Connected to the server");
      });

      socket.on("connect_error", (err) => {
        console.error("CONNECT ERROR", err.message)
      })
      
      socket.emit("join", { room: "room1" });
    };
    joinRoom();
  }, [username]);

  useEffect(() => {
    return () => {
      // to avoid duplicating messages
      socket.off("message", updateMessages);
    }
  }, [messages]);

  const enterMessage = (event: { key: string; preventDefault: () => void; }) => {
    if(event.key === "Enter") {
      console.log("Pressed enter key");
      event.preventDefault();

      socket.emit("message", {
        room: "room1",
        message: chatMessage,
        username: username
      });

      socket.on("message", updateMessages); 
      setChatMessage("");
    }
  }

  return (
    <>
      <Header />
      <div className='chatContainer'>
        <p className='username'>{`Logged In As: ${username}`}</p>
        <p>{`Chatting with: ${ ("username" in chatmate) ? chatmate["username"] : "no user"}`}</p>
        <div className='chatArea'>
          { messages.length === 0 && (<p>**Empty**</p>) }
          { messages.length > 0 && 
            messages.map((msg) => {
              return <p key={msg["key"]}>{msg["message"]}</p>
            })
          }
        </div>
        <label>
          Enter your message here:
          <input 
            type='text' 
            className='chatbox'
            value={chatMessage}
            onKeyDown={enterMessage}
            onChange={e => setChatMessage(e.target.value)}
            placeholder='Say Hi!'
          />
        </label>
      </div>
    </>
  )
}

export default ChatPage
