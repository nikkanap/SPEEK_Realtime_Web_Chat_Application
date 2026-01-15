import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { loadPage } from './components/utils';

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
  const [roomID, setRoomID] = useState("");

  const apiURL = import.meta.env.VITE_API_URL;

  // socket operations
  const socket = useRef<any>(null);

  // **** FUNCTIONS ****
  // function for updating messages
  const updateMessages = (msg:MsgType) => {
    setMessages(prev => [...prev, msg]);
  };

  // function for getting chatmate data
  const getChatmate = async () => {
    const res = await fetch(`${apiURL}/get_chatmate`, {
      headers: { "Content-Type" : "application/json"},
      credentials: "include"
    });
    
    const chatmateData = await res.json();
    setChatmate(chatmateData);
  }
  
  // **** USEFFECTS ****
  useEffect(() => {
    // NOTE: Later on when polishing, make a type for data in these
    loadPage().then((data:any) => {
      setUsername(("username" in data) ? data.username : "error");
    });
    
    getChatmate().then((data:any) => {
      setChatmate(("username" in data) ? data.username : "error");
    });
    
    // setting the value of socket
    socket.current = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      transports: ["websocket"], // important. always add this
    });

    // run once to have one continuing listener
    socket.current.on("message", updateMessages); 

    return () => {
      // to avoid duplicating messages
      socket.current.off("message", updateMessages);
    }
  }, []);

  // run when username and chatmate update
  useEffect(() => {
    const tempRoomID = "room1";
    //`dm_${username}_${("username" in chatmate) ? chatmate["username"] : "error"}`;
    setRoomID(tempRoomID);

    const joinRoom = async () => {
      socket.current.on("connect", () => {
        console.log("Connected to the server");
      });

      socket.current.on("connect_error", (err:any) => {
        console.error("CONNECT ERROR", err.message)
      })
      
      socket.current.emit("join", 
        { 
          room: tempRoomID,
          user: username
        });
    };
    
    joinRoom();
  }, [username, chatmate]);

  const enterMessage = (event: { key: string; preventDefault: () => void; }) => {
    if(event.key === "Enter") {
      console.log("Pressed enter key");
      event.preventDefault();

      socket.current.emit("message", {
        room: roomID  ,
        message: chatMessage,
        username: username
      });

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
