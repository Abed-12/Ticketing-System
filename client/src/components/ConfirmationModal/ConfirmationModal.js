import React from 'react';
import './ConfirmationModal.css';
import { useSelector } from 'react-redux';

const ConfirmationModal = ({ message, onConfirm, onCancel, onDropdownChange }) => {
    const technicalUsers = useSelector((state) =>
        state.auth.users
            .filter(user => user.role === 'Technical')
            .map(user => ({
                name: user.name,
                jobTitle: user.jobTitle
            }))
    );

    return (
        <div className="modalBackdrop">
            <div className="modal">
                <p>{message}</p>
                
                {onDropdownChange && (
                    <select onChange={onDropdownChange} className="dropdown" >
                        <option className='dropdown-option' value="null">Select a technical</option>
                        {technicalUsers.map((option, index) => (
                            <option className='dropdown-option' key={index} value={option.name}>
                                {option.name} - {option.jobTitle}
                            </option>
                        ))}
                    </select>
                )}

                <div className="modalActions">
                    <button onClick={onConfirm} className="confirmButton">
                        Yes
                    </button>
                    <button onClick={onCancel} className="cancelButton">
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;