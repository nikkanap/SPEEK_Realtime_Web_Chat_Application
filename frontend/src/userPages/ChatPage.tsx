import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function ChatPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <table>
        <thead>
          <th>Chats</th>
          <th>Other's Username</th>
        </thead>

        <tbody>
          <tr>
            <td>Chat1</td>
            <td>Nikka</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default ChatPage
