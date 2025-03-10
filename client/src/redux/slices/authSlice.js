import { createSlice } from '@reduxjs/toolkit';

let idCounter = 1;
const generateId = () => idCounter++;

const initialState = {
    user: null,
    users: [
        {id: generateId(), name: 'Ahmed Saleh', email: 'ahmedsaleh@gmail.com', password: '12345678', role: 'Admin', jobTitle: 'System Administrator' },
        {id: generateId(), name: 'Hassan Ali', email: 'hassanali@gmail.com', password: '12345678', role: 'Technical', jobTitle: 'Software Engineer' },
        {id: generateId(), name: 'Omar Khaled', email: 'omarkhaled@gmail.com', password: '12345678', role: 'Admin', jobTitle: 'IT Manager' },
        {id: generateId(), name: 'Yousef Mahmoud', email: 'yousefmahmoud@gmail.com', password: '12345678', role: 'Technical', jobTitle: 'Network Engineer' },
        {id: generateId(), name: 'Mohamed Tarek', email: 'mohamedtarek@gmail.com', password: '12345678', role: 'Admin', jobTitle: 'Security Analyst' },
        {id: generateId(), name: 'Khaled Mostafa', email: 'khaledmostafa@gmail.com', password: '12345678', role: 'Technical', jobTitle: 'Database Administrator' },
        {id: generateId(), name: 'Ali Nasser', email: 'alinasser@gmail.com', password: '12345678', role: 'Admin', jobTitle: 'Cloud Engineer' }
    ],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { email, password } = action.payload;
            const user = state.users.find(user => user.email === email && user.password === password);
            if (user) {
                state.user = { 
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    jobTitle: user.jobTitle
                };
            } else {
                state.user = null;
                throw new Error('Invalid email or password');
            }
        },
        logout: (state) => {
            state.user = null;
            throw new Error('Logout successful');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;