import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://osl-backend.onrender.com/api/v1/auth/forgot-password', {
        email,
      });

      if (response.data.success) {
        setSuccess('Password reset link has been sent to your email address.');
        setError('');
      } else {
        setError(response.data.message);
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

  const handleReturnToLogin = () => {
    navigate('/login'); // Navigate back to the login page
  };

  return (
    <div className="lala">
      <div className="bg">
        <div className='login-first-div'>
          <div className='left-side'>
            <div className='left-main'>
              <img src='MAINLOGO.png' alt='Your Image' />
            </div>
          </div>

          <div className="right-side">
            <form className='login-main' onSubmit={handleSubmit}>
              <div className='text-login'>Forgot Password</div>
              <label className='label1'>
                <div className='email-id'>
                  Email Id <sup className='star'>*</sup>
                </div>
                <input
                  className='email_input'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter the email'
                />
              </label>
              <div className='signup-link'>
                <button type='submit' className='signup'>
                  SUBMIT
                </button>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {success && <p style={{ color: 'green' }}>{success}</p>}
              <div className='to-login'>
                <span onClick={handleReturnToLogin}>Return to Login</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ForgotPassword;
