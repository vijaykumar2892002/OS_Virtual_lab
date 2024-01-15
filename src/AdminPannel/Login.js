import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import './login.css';
import PasswordToggle from "./PasswordToggle";

const Login = () => {
  const navigate = useNavigate();
  const signup = () => navigate('/Register');
  const [showpassword, setshowpassword] = useState(false);
  
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password:Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://osl-backend.onrender.com/api/v1/auth/login', {
          email: values.email,
          password: values.password,
        });
        
        if (response.data.success) {
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(response.data.user));
          // Redirect to admin page after successful login
          navigate('/AdminPanel');
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
          });
        } else {
          // Login failed, display error message as a toast notification centered on the screen
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          // Display the error message received from the server as a toast notification centered on the screen
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          // Display a generic error message as a toast notification centered on the screen
          toast.error('An error occurred during login.', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        
        console.error(error);
      }
    },
  });
  
  
  const handleForgotPassword = () => navigate('/forgot-password'); 

  
  return (
    <div className='lala'>
    <div className='bg'>
        <div className='login-first-div'>

          <div className='left-side'>
            <div className='left-main'>
            <img className='MAIN_LOGO' src='MAINLOGO.png' alt='Your Image' />
            {/* <img src='pict_logo.png' alt='Your Image' /> */}
            </div>
          </div>

          <div className='right-side'>
            <form className='login-main' onSubmit={formik.handleSubmit}>
              <div className='text-login'>Log In</div>
              
              <label className='label1'>
                  <div className='email-id'>
                    Email Id <sup className='star'>*</sup>
                  </div>
                  <input
                    required
                    className='email-input'
                    type='email'
                    {...formik.getFieldProps('email')}
                    placeholder='Enter the email'
                    />
                {formik.touched.email && formik.errors.email && <p className='error-message'>{formik.errors.email}</p>}
              </label>
              
      <label className='label1 password-main'>
      <div className='email-id'>
        Password <sup className='star'>*</sup>
      </div>
  
        <input
          required
          className='email-input'
          type={showpassword ? 'text' : 'password'}
          {...formik.getFieldProps('password')}
          placeholder='Enter the password'
        />
        <PasswordToggle showpassword={showpassword} setshowpassword={setshowpassword} /> {/* Use the PasswordToggle component here */}
        {formik.touched.password && formik.errors.password && (
          <p className='error-message'>{formik.errors.password}</p>
        )}
    
      {/* ... (rest of the component) */}
    </label>
                <div className='forget-password'>
                <span onClick={handleForgotPassword}>Forgot Password?</span>
              </div>
              
              <div className='signup-link'>
                <button type='submit' className='signup'>
                  SIGN IN
                </button>
                <div className='End-msg'>
                  Don't have an account? <span className='signup-button' onClick={signup}>
                    Sign-Up
                  </span>
                  </div>
              </div>
              
            </form>
          </div>
        </div>
    </div>
    </div>
    
    
    );
  };

  export default Login;
  
  // import React, { useState } from 'react';
  // import axios from 'axios';
  // import { useNavigate } from 'react-router-dom';
  // import { toast } from 'react-toastify';
  // import './login.css';
  // import * as Yup from 'yup';
  // import Swal from "sweetalert2";
  
  // const Login = () => {
   
  
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const navigate = useNavigate();
  
  //   const validationSchema = Yup.object({
  //     email: Yup.string().email('Invalid email address').required('Email is required'),
  //     password: Yup.string().required('Password is required'),
  //   });
  
    
  
  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  
  //     try {
  //       const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
  //         email,
  //         password,
  //       });
        
  //       if (response.data.success) {
  //         // Store user data in localStorage
  //         localStorage.setItem('user', JSON.stringify(response.data.user));
  //         // Redirect to admin page after successful login
  //         navigate('/AdminPanel');
  //         Swal.fire({
  //           icon: "success",
  //           title: "login Successful!",
           
  //         });
  //       } else {
  //         // Login failed, display error message as a toast notification centered on the screen
  //         toast.error(response.data.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       }
  //     } catch (error) {
  //       if (error.response && error.response.data && error.response.data.message) {
  //         // Display the error message received from the server as a toast notification centered on the screen
  //         toast.error(error.response.data.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       } else {
  //         // Display a generic error message as a toast notification centered on the screen
  //         toast.error('An error occurred during login.', {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       }
  
  //       console.error(error);
  //     }
     
  //     // Clear the input fields
  //     setPassword('');
  //     setEmail('');
  //   };
  
  //   const signup = () => navigate('/Register');
  
  //   const handleForgotPassword = () => {
  //     navigate('/forgot-password'); // Navigate to the forgot password page
  //   };
  
  //   return (
  //     <div className='login-first-div'>
  //       <form className='login-main' onSubmit={handleSubmit}>
        
  // <div>
  //           <label  className='label'><h2 className='text-login'>Login</h2></label>
  //           <p className='email-id'>Email Id <sup className='star'>*</sup></p>
  //           <input required
  //           className='email-input'
  //             type='email'
  //             value={email}
  //             placeholder='Enter the gmail'
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //         </div>
  //         <div>
  //           <label className='label'></label>
  //           <p className='email-id'>Password <sup className='star'>*</sup></p>
  //           <input required
  //           className='email-input'
  //             type='password'
  //             placeholder=' Enter password'
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //         </div>
  //         {/* ... your form fields and input elements */}
  //         <button type='submit' className='signup'>
  //           SIGN IN
  //         </button>
  //         <p className='signup-link'>
  //           Don't have an account? <span className='signup-button' onClick={signup}>Sign-Up</span>
  //         </p>
  //         <p className='forget-password'>
  //           <span onClick={handleForgotPassword}>Forgot Password?</span>
  //         </p>
  //       </form>
  //     </div>
  //   );
  // };
  
  // export default Login;