
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import KanbanBoard from './components/KanbanBoard';
import SkeletonLoading from './components/SkeletonLoading';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDAta() {
    try {
      setLoading(true);
      const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
      console.log(response.data);
      setTickets(response.data.tickets);
      setUsers(response.data.users);
    } catch (error) {
      alert("Internal Server Error");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchDAta();
  }, [])
  return (
    <div className="App">
      {loading
        ?
        <SkeletonLoading/>
        :
        <KanbanBoard tickets={tickets} users={users} />
      }
    </div>
  );
}

export default App;
