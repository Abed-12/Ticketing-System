import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import {ToastContainer} from 'react-toastify';
import {handleError} from '../../utils/utils';

import './login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            dispatch(login({ email, password }));
            navigate('/dashboard');
        } catch (error) {
            handleError(error.message);
        }
    };
    
    return (
        <div className="login">
            <div className="login-container">
                <h1 className="login-h1">Sign In</h1>
                <p className="login-text">
                    Sign Into Your Account
                </p>
                <form className="login-form" onSubmit={e => onSubmit(e)}>
                    <div className="login-form-div">
                        <input 
                            className='login-form-input'
                            type="email" 
                            placeholder="Email Address" 
                            name="email" 
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="login-form-div">
                        <input
                            className='login-form-input'
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input type="submit" className="login-submit" value="Login" />
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;