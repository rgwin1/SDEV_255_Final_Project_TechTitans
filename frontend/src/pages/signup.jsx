import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ensures styles apply

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        email: '',
        role: 'student' // Default role is student
    });
    const [error, setError] = useState('');

    // Handles input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log("Sending signup request with:", formData); 

            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();
            console.log("Signup response:", data); // Log response

            if (!response.ok) {
                setError(data.message);
                return;
            }

            alert('Account created successfully!');
            navigate('/login');

        } catch (error) {
            console.error("Signup error:", error);
            setError('Server error. Please try again later.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Role:</label>
                    <div className="radio-group">
                        <label>
                            <input type="radio" name="role" value="student" checked={formData.role === 'student'} onChange={handleChange} />
                            Student
                        </label>
                        <label>
                            <input type="radio" name="role" value="teacher" checked={formData.role === 'teacher'} onChange={handleChange} />
                            Teacher
                        </label>
                    </div>
                </div>

                <button className="submitbutton" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
