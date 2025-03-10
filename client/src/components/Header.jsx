import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    return navigate("/create");
  };

  return (
    <header className="dashboard-header">
      <div className="header-title">
        <h1>Dashboard Overview</h1>
        <p>Manage and track your support tickets</p>
      </div>
      <div className="header-actions">
        <button 
          className="create-ticket-btn"
          onClick={() => handleCreate()}
        >
          <PlusCircle />
          Create Ticket
        </button>
      </div>
    </header>
  );
}

export default Header;