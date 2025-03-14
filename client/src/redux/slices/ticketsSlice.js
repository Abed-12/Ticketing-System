import { createSlice } from '@reduxjs/toolkit';

let idCounter = 1;
const generateId = () => idCounter++;

const initialState = {
    list: [
        { id: generateId(), title: 'Login System Issue', description: 'Issue with login system', status: 'Open', assignee: 'Hassan Ali', urgency: 'High', dateTime: '2025-03-06 10:30 a.m.', creator: 'Omar Khaled', solve: 'Pending' },
        { id: generateId(), title: 'Mobile App Crash', description: 'App crashes on iOS devices', status: 'Open', assignee: 'null', urgency: 'Medium', dateTime: '2025-03-06 11:00 a.m.', creator: 'Ahmed Saleh', solve: 'Pending' },
        { id: generateId(), title: 'Database Connection Error', description: 'Database connection error', status: 'Resolved', assignee: 'Hassan Ali', urgency: 'Low', dateTime: '2025-03-05 02:45 p.m.', creator: 'Hassan Ali', solve: 'Reconfigured the database connection settings and restarted the server' },
        { id: generateId(), title: 'UI Bug on Homepage', description: 'UI bug on homepage', status: 'Resolved', assignee: 'Yousef Mahmoud', urgency: 'Medium', dateTime: '2025-03-04 09:30 a.m.', creator: 'Khaled Mostafa', solve: 'Fixed the UI issue by correcting CSS styles affecting the homepage layout' },
        { id: generateId(), title: 'Server Down', description: 'Server down', status: 'Open', assignee: 'Khaled Mostafa', urgency: 'High', dateTime: '2025-03-06 01:15 p.m.', creator: 'Ali Nasser', solve: 'Pending' },
        { id: generateId(), title: 'API Timeout Issue', description: 'API requests are timing out', status: 'Resolved', assignee: 'Khaled Mostafa', urgency: 'Medium', dateTime: '2025-03-06 11:30 a.m.', creator: 'Mohamed Tarek', solve: 'Fixed the API timeout issue by optimizing the database queries and increasing server timeout' },
        { id: generateId(), title: 'Payment Gateway Failure', description: 'Payment gateway failure', status: 'Open', assignee: 'Yousef Mahmoud', urgency: 'High', dateTime: '2025-03-06 08:00 a.m.', creator: 'Omar Khaled', solve: 'Pending' },
        { id: generateId(), title: 'Error on Product Page', description: 'Error in product page', status: 'Resolved', assignee: 'Khaled Mostafa', urgency: 'Low', dateTime: '2025-03-05 04:00 p.m.', creator: 'Ahmed Saleh', solve: 'Fixed the error by resolving a JavaScript conflict on the product page' },
        { id: generateId(), title: 'Email Notifications Failure', description: 'Email notifications not being sent', status: 'Open', assignee: 'null', urgency: 'Medium', dateTime: '2025-03-06 06:45 p.m.', creator: 'Mohamed Tarek', solve: 'Pending' }
    ],
};

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        addTicket: (state, action) => {
            state.list.push({
                id: generateId(),
                ...action.payload
            });
        },
        updateTicket: (state, action) => {
            const index = state.list.findIndex(ticket => ticket.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        deleteTicket: (state, action) => {
            state.list = state.list.filter(ticket => ticket.id !== action.payload);
        },
    },
});

export const { addTicket, updateTicket, deleteTicket } = ticketsSlice.actions;

export default ticketsSlice.reducer;