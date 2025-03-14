import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTicket } from '../../../redux/slices/ticketsSlice';
import './createTicket.css';

const CreateTicket = () => {
    const user = useSelector((state) => state.auth.user);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        urgency: ''
    });

    const { title, description, urgency } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h12",
    }).format(now).replace(",", "");

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(addTicket({ title, description, status: 'Open', assignee: 'null', urgency, dateTime: formattedDate, creator: user.name, solve: 'Pending' }));
        navigate('/dashboard');
    }

    return (
        <Fragment>
            <div className="create-ticket">
                <div className="create-line"></div>

                <h1 className="create-title">
                    Create Ticket
                    <div className="create-underline"></div>
                </h1>

                <form className="create-form" onSubmit={e => onSubmit(e)}>
                    <label className="create-info">
                        <strong className="create-info-label">Title:</strong>
                        <input 
                            type="text" 
                            className="create-info-value" 
                            name="title" 
                            value={title}
                            onChange={e => onChange(e)}
                            required 
                        />
                    </label>

                    <label className="create-info">
                        <strong className="create-info-label">Description:</strong>
                        <textarea 
                            className="create-info-value create-textarea" 
                            name="description"
                            value={description} 
                            rows={4}
                            maxLength={700}
                            onChange={e => onChange(e)}
                            required>
                        </textarea>
                    </label>

                    <label className="create-info">
                        <strong className="create-info-label">Urgency:</strong>
                        <select className="create-info-value create-urgency-select" name="urgency" value={urgency} onChange={e => onChange(e)} required>
                            <option className='create-option create-urgency-option' value="">Select Urgency</option>
                            <option className='create-option create-urgency-option' value="Low">Low</option>
                            <option className='create-option create-urgency-option' value="Medium">Medium</option>
                            <option className='create-option create-urgency-option' value="High">High</option>
                        </select>
                    </label>

                    <button type="submit" className="create-submit-button">Submit</button>
                </form>
            </div>
        </Fragment>
    );
};

export default CreateTicket;