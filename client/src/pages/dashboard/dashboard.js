import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import TicketList from '../../components/TicketList';
import MetricCards from '../../components/MetricCards';
import './dashboard.css';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const tickets = useSelector((state) => state.tickets.list);
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(tickect => tickect.status === 'Open').length;
  const resolvedTickets = tickets.filter(tickect => tickect.status === 'Resolved').length;

  return (
    <Fragment>
      <div className="dashboard-container">
        <Sidebar 
          name={user.name}
          jobTitle={user.jobTitle}
        />
        <main className="dashboard-main">
          <Header />
          <div className="dashboard-content">
            <MetricCards 
              totalTickets={totalTickets} 
              openTickets={openTickets} 
              resolvedTickets={resolvedTickets} 
            />
            <TicketList role={user.role} name={user.name} />
          </div>
        </main>
      </div>
    </Fragment>
  );
}

export default Dashboard;