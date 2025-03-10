import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/slices/authSlice';
import ticketsReducer from './redux/slices/ticketsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        tickets: ticketsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store; 