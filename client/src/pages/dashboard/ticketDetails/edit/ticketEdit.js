import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTicket } from '../../../../redux/slices/ticketsSlice';
import './ticketEdit.css';


const TicketEdit = () => {
    const { id } = useParams();
    const ticket = useSelector((state) => state.tickets.list.find(ticket => ticket.id === parseInt(id)));

    const [editedTicket, setEditedTicket] = useState({ ...ticket });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEditedTicket({ ...editedTicket, [e.target.name]: e.target.value });
    };

    const editSave = (e) => {
        e.preventDefault();
        dispatch(updateTicket(editedTicket));
        navigate(`/tickets/${id}`);
    };

    const cancelEdit = () => {
        navigate(`/tickets/${id}`);
    };

    return (
        <Fragment>
            <div className="edit-details" key={ticket.id}>
                <div className="edit-line"></div>
                
                <h1 className="edit-title">
                    Ticket Edit
                    <div className="edit-underline"></div>
                </h1>

                <form onSubmit={editSave}>
                    <p className="edit-info">
                        <strong className="edit-info-label">Title:</strong> 
                        <input
                            className='edit-input-details'
                            placeholder={ticket.title}
                            type="text"
                            name="title"
                            onChange={handleChange}
                        />
                    </p>

                    <p className="edit-info">
                        <strong className="edit-label">Description:</strong> 
                        <textarea
                            className='edit-input-details textarea-details'
                            placeholder={ticket.description}
                            name="description"
                            rows={4}
                            maxLength={700}
                            onChange={handleChange}
                        />
                    </p>

                    <p className="edit-info">
                        <strong className="edit-label">Urgency:</strong> 
                        <select className="edit-input edit-urgency-select" name="urgency" value={editedTicket.urgency} onChange={handleChange} required>
                            <option className='edit-option edit-urgency-option' value="">Select Urgency</option>
                            <option className='edit-option edit-urgency-option' value="Low">Low</option>
                            <option className='edit-option edit-urgency-option' value="Medium">Medium</option>
                            <option className='edit-option edit-urgency-option' value="High">High</option>
                        </select>
                    </p>
                    <div className="edit-actions">
                        <button type="submit" className="edit-btn save">Save</button>
                        <button type="button" className="edit-btn cancel" onClick={cancelEdit}>Cancel</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default TicketEdit;