import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';
import { deleteTicket } from '../../../redux/slices/ticketsSlice';
import './ticketDetails.css';

const TicketDetails = () => {
    const { id } = useParams();

    const [showModal, setShowModal] = useState(false);
    const [deleteTicketId, setDeleteTicketId] = useState(null);

    const ticket = useSelector((state) => state.tickets.list.find(ticket => ticket.id === parseInt(id)));
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    if (!ticket) {
        return <p>Ticket not found</p>;
    }

    // delete ticket
    const handleDelete = (id) => {
        setDeleteTicketId(id);
        setShowModal(true);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    const confirmDelete = () => {
        dispatch(deleteTicket(deleteTicketId));
        setShowModal(false);
        navigate('/dashboard');
    };

    // edit
    const handleEdit = () => {
        navigate(`/tickets/${id}/edit`)
    };

    // back
    const handleBack = () => {
        navigate('/dashboard');
    };

    return (
        <Fragment>
            <div className="ticket-details" key={ticket.id}>
                <div className="ticket-line"></div>
                <h1 className="ticket-title">
                    Ticket Details
                    <div className="title-underline"></div>
                </h1>
                
                <p className="ticket-info ticket-grid">
                    <div>
                        <strong className="info-label">Title:</strong> 
                    </div>
                    <div>
                        <span className="info-value">{ticket.title}</span>
                    </div>
                </p>

                <p className="ticket-info ticket-grid">
                    <div>
                        <strong className="info-label">Description:</strong> 
                    </div>
                    <div>
                        <span className="info-value">{ticket.description}</span>
                    </div>
                </p>
                
                <p className="ticket-info">
                    <strong className="info-label">Status:</strong> 
                    <span className={`info-value status-view ${ticket.status}`}>{ticket.status}</span>
                </p>

                <p className="ticket-info">
                    <strong className="info-label">Assignee:</strong> 
                    <span className="info-value">{ticket.assignee}</span>
                </p>
                
                <p className="ticket-info">
                    <strong className="info-label">Urgency:</strong> 
                    <span className={`info-value value-urgency  ${ticket.urgency}`} >
                        {ticket.urgency}
                    </span>
                </p>

                <p className="ticket-info">
                    <strong className="info-label">Time:</strong> 
                    <span className="info-value">{ticket.dateTime}</span>
                </p>

                <p className="ticket-info">
                    <strong className="info-label">Creator:</strong> 
                    <span className="info-value">{ticket.creator}</span>
                </p>
                
                <p className="ticket-info ticket-grid">
                    <div>
                        <strong className="info-label">Solve:</strong> 
                    </div>
                    <div>
                        <span className={`info-value ${ticket.solve} solve-view`}>{ticket.solve}</span>
                    </div>
                </p>

                <div className="details-actions">
                    <button className="details-btn back" onClick={handleBack}>Back</button>
                    {user.role === 'Admin' && (
                        <>
                            <button className="details-btn edit" onClick={handleEdit}>Edit</button>
                            <button className="details-btn delete" onClick={() => handleDelete(ticket.id)}>Delete</button>                            
                        </>
                    )}
                </div>
            </div>

            {showModal && (
                <ConfirmationModal
                    message={`Are you sure you want to delete ticket ${deleteTicketId}?`}
                    onConfirm={() => confirmDelete()}
                    onCancel={cancelDelete}
                />
            )}
        </Fragment>
    );
};

export default TicketDetails;
