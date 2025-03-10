import React from 'react';
import { Home, CircleUserRound, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils/utils';

const Sidebar = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logout());
    } catch (error) {
      handleError(error.message);
      setTimeout (() => {
        navigate('/login');
      }, 1000);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <h2>Ticketing System</h2>
      </div>

      <nav className="sidebar-menu">
        <button className={`sidebar-menu-item active`}>
          <Home />
          <span>Dashboard</span>
        </button>
        
        <button className={`sidebar-menu-item`} onClick={handleLogout}>
          <LogOut />
          <span>Logout</span>
        </button>
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">{<CircleUserRound/>}</div>
        <div className="user-info">
          <p>{props.name}</p>
          <span>{props.jobTitle}</span>
        </div>
      </div>
      <ToastContainer />
    </aside>
  );
}

export default Sidebar;