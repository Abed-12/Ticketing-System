import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './routes/PrivateRoute';

import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login';
import TicketDetails from './pages/dashboard/ticketDetails/ticketDetails';
import CreateTicket from './pages/dashboard/createTicket/createTicket';
import TicketEdit from './pages/dashboard/ticketDetails/edit/ticketEdit';
import TicketSolve from './pages/dashboard/solveTicket/solveTicket';
import { useSelector } from 'react-redux';

const App = () => {
  const auth = useSelector((state) => state.auth.user);
  
return(
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to ="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute
                                          isAuthenticated={auth}
                                          allowedRoles={['Admin', 'Technical']}
                                          element={<Dashboard />}
                                        />} />
      
      <Route path="/tickets/:id" element={<PrivateRoute
                                                isAuthenticated={auth}
                                                allowedRoles={['Admin', 'Technical']}
                                                element={<TicketDetails />}
                                              />} />

      <Route path="/tickets/:id/edit" element={<PrivateRoute
                                                isAuthenticated={auth}
                                                allowedRoles={['Admin']}
                                                element={<TicketEdit />}
                                              />} />
      
      <Route path="/create" element={<PrivateRoute
                                      isAuthenticated={auth}
                                      allowedRoles={['Admin', 'Technical']}
                                      element={<CreateTicket />}
                                    />} />

      <Route path="/solve/:id" element={<PrivateRoute
                                          isAuthenticated={auth}
                                          allowedRoles={['Technical']}
                                          element={<TicketSolve />}
                                        />} /> 

    </Routes>
  </Router>
  );
};

export default App;