import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './resetPassword.css';


const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const ResetPassword = () => {
  const { token } = useParams();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post(`https://osl-backend.onrender.com/api/v1/auth/reset-password/${token}`, {
        email,
        newPassword,
      });

      if (response.data.success) {
        setSuccess('Password reset successfully');
        setError('');
        setNewPassword('');
        setEmail('');
      } else {
        setError(response.data.error);
        setSuccess('');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }

      console.error(error);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="reset-password-container">
      <div className='form-main-reset'>
        <h2 className='text-top'>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className='email-part'>
            <label className='reset-email'>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='new-password-part'>
            <label className='reset-password'>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=' reset-button'><button type="submit">Submit New Password</button></div>

        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {success && (
          <button onClick={handleLoginClick}>Login</button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
