import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import ConfirmationModal from './ConfirmationModal/ConfirmationModal';
import { updateTicket } from '../redux/slices/ticketsSlice';

const TicketList = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [assignTicket, setAssignTicket] = useState({ id: '', assignee: '' });
    
    const tickets = useSelector((state) => 
        state.tickets.list.filter((ticket) => {
            if (props.role === 'Admin') {
                return ticket.creator === props.name || ticket.assignee === 'null';
            } else if (props.role === 'Technical') {
                return ticket.creator === props.name || ticket.assignee === props.name;
            }
            return true;
        })
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/tickets/${id}`);  
    }

    const handleAssign = (id) => {
        const ticket = tickets.find(ticket => ticket.id === id);
        if (ticket) {
            setAssignTicket({ id: ticket.id, assignee: ticket.assignee });
            setShowModal(true);
        }
    };
    
    const confirmAssign = () => {
        const ticketToUpdate = tickets.find(ticket => ticket.id === assignTicket.id);
        const updatedTicket = { ...ticketToUpdate, assignee: assignTicket.assignee };
        dispatch(updateTicket(updatedTicket));
        setShowModal(false);
    };

    const cancelAssign = () => {
        setShowModal(false);
    };

    const handleDropdownChange = (e) => {
        setAssignTicket({ ...assignTicket, assignee: e.target.value });
    };

    const handelSolve = (id) => {
        navigate(`/solve/${id}`)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'title', headerName: 'Title', width: 230 },
        { field: 'creator', headerName: 'Creator', width: 150 },
        { 
            field: 'urgency', 
            headerName: 'Urgency', 
            width: 90,
            renderCell: (params) => (
                <span className={`urgency ${params.value}`}>
                    {params.value}
                </span>
            ),
        },
        { field: 'dateTime', headerName: 'Time', width: 170 },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 100,
            renderCell: (params) => (
                <span className={`status ${params.value}`}>
                    {params.value}
                </span>
            ),
        },
        { field: 'assignee', headerName: 'Assignee', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 167,
            disableColumnMenu:true,
            sortable: false,
            renderCell: (params) => (
                <>
                    <button className="action-btn view" onClick={() => handleView(params.row.id)}>View</button>
                    {props.role === 'Admin' && (
                        <button className="action-btn assign" onClick={() => handleAssign(params.row.id)}>Assign</button>
                    )}
                    {props.role === 'Technical' && params.row.assignee === props.name && params.row.status === 'Open' && (
                        <button className="action-btn solve" onClick={() => handelSolve(params.row.id)}>Solve</button>
                    )}
                </>
            ),
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Paper sx={{ width: '100%' }}>
            <DataGrid
                rows={tickets}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
                disableColumnResize
                disableColumnSelector
                disableRowSelectionOnClick
            />
            
            {showModal && (
                <ConfirmationModal
                    message={`Please choose a technical user to assign ticket #${assignTicket.id} to.`}
                    onDropdownChange={handleDropdownChange}
                    onConfirm={confirmAssign}
                    onCancel={cancelAssign}
                />
            )}
        </Paper>
    );
}

export default TicketList;