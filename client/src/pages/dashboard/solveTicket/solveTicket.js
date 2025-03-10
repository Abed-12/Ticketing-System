import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './solveTicket.css'
import { updateTicket } from '../../../redux/slices/ticketsSlice';

const SolveTicket = () => {
    const { id } = useParams();
    const ticket = useSelector((state) => state.tickets.list.find(ticket => ticket.id === parseInt(id)));

    const [editedTicket, setEditedTicket] = useState({ ...ticket });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEditedTicket({ ...editedTicket, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        
        const updatedTicket = { ...editedTicket, status: 'Resolved' };
        dispatch(updateTicket(updatedTicket));
        navigate(`/tickets/${id}`);
    }

    const cancelSave = () => {
        navigate('/dashboard');
    };

    return (
        <Fragment>
            <div className="solve-ticket" key={ticket.id}>
                <div className="solve-line"></div>
                <h1 className="solve-title">
                    Ticket Solve
                    <div className="solve-underline"></div>
                </h1>
                <div className="solve-info solve-grid">
                    <div>
                        <strong className="solve-label">Title:</strong> 
                    </div>
                    <div>
                        <span className="solve-value">{ticket.title}</span>
                    </div>
                </div>

                <div className="solve-info solve-grid">
                    <div>
                        <strong className="solve-label">Description:</strong> 
                    </div>
                    <div>
                        <span className="solve-value">{ticket.description}</span>
                    </div>
                </div>
                
                <form onSubmit={handleSave}>
                    <div className="solve-info">
                        <strong className="solve-label">Solve:</strong> 
                        <textarea
                            className='solve-input textarea-solve'
                            name="solve"
                            placeholder={ticket.solve}
                            rows={4}
                            maxLength={700}
                            onChange={handleChange}
                            required
                        />
                    </div>
                
                    <div className="solve-actions">
                        <button type='submit' className="solve-btn save">Save</button>
                        <button type='button' className="solve-btn cancel" onClick={cancelSave}>Cancel</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default SolveTicket;