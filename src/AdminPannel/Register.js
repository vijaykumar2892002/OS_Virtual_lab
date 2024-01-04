import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import './register.css';
const Register = () => {
  const navigate = useNavigate();
  
  const isValidEmail = (email) => {
    const validDomains = ["gmail.com", "pict.edu"];
    const [, domain] = email.split('@');
    return validDomains.includes(domain);
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("*Required"),
    // email: Yup.string().email("Invalid email address").required("*Required"),
    email: Yup.string()
      .email("Invalid email address")
      .test("valid-email", "Invalid email domain", (value) => isValidEmail(value))
      .required("*Required"),
    address: Yup.string().required("*Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("*Required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("*Required"),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setFieldError, resetForm }) => {
      const { confirmPassword, ...formData } = values; // Exclude confirmPassword from formData
  
      if (values.password !== values.confirmPassword) {
        setFieldError("confirmPassword", "Passwords must match");
        return;
      }
      
      if (!isValidEmail(values.email)) {
        setFieldError("email", "Invalid email address. Allowed domains: gmail.com, pict.edu");
        return;
      }
      
      axios.post("https://osl-backend.onrender.com/api/v1/auth/register", formData)
        .then((response) => {
          if (response.data.success) {
            console.log("Registration successful!");
            // Handle success logic here
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              text: "You can now check your email for verification.",
            });
            resetForm();
          } else {
            console.log("Registration failed:", response.data.message);
            setFieldError("email", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);
          setFieldError("email", "An error occurred. Please try again later.");
        });
    },
  });
  


  const login = () => navigate("/login");

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
            <form onSubmit={formik.handleSubmit}>
            <div className='Text-login'>Sign Up</div>
              <div className="signup-main">
              <div className="input-block">
                <label htmlFor="name" className="input-label">
                  {/* Name */}
                </label>
                <input type="text" autoComplete="off" placeholder="Name" {...formik.getFieldProps("name")} />
                {formik.touched.name && formik.errors.name && <p className="form-error">{formik.errors.name}</p>}
              </div>
              <div className="input-block">
                <label htmlFor="email" className="input-label">
                  {/* Email */}
                </label>
                <input type="email" placeholder="E-mail" autoComplete="off" {...formik.getFieldProps("email")} />
                 {formik.touched.email && formik.errors.email && <p className="form-error">{formik.errors.email}</p>}
              </div>
              <div className="input-block">
                <label htmlFor="address" className="input-label">
                  {/* Address <sup className='star'>*</sup> */}
                 </label>
                <input type="text" placeholder="Address" autoComplete="off" {...formik.getFieldProps("address")} />
                    {formik.touched.address && formik.errors.address && <p className="form-error">{formik.errors.address}</p>}
               </div> 
             
              <div className="input-block">
                <label htmlFor="phone" className="input-label">
                  {/* Phone <sup className='star'>*</sup> */}
                </label>
                <input type="tel"  placeholder="Mobile Number" autoComplete="off" {...formik.getFieldProps("phone")} />
                   {formik.touched.phone && formik.errors.phone && <p className="form-error">{formik.errors.phone}</p>} 
              </div>
             
              
              <div className="input-block">
                <label htmlFor="password" className="input-label">
                  {/* Password */}
                </label>
                <input type="password" placeholder="Password" autoComplete="off" {...formik.getFieldProps("password")} />
                {formik.touched.password && formik.errors.password && <p className="form-error">{formik.errors.password}</p>}
              </div>
              <div className="input-block">
          <label htmlFor="confirmPassword" className="input-label">
            {/* Confirm Password */}
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="form-error">{formik.errors.confirmPassword}</p>
          )}
        </div>

                  <div className="modal-buttons">
                    <button className="input-button" type="submit">
                      Sign Up
                    </button>
                    <div className="login">
                      Already have an account? <span className="llogin" onClick={login}>Login now</span>
                    </div>
                  </div>
              </div>
            </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Register;



// import axios from "axios";
// import { useFormik } from "formik";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import * as Yup from "yup";
// import './register.css';
// const Register = () => {
//   const navigate = useNavigate();

//   const validationSchema = Yup.object({
//     name: Yup.string().min(2).max(25).required("*Required"),
//     email: Yup.string().email("Invalid email address").required("*Required"),
//     phone: Yup.string().matches(/^\d{10}$/, "Number Must be 10 digits").required("*Required"),
//     address: Yup.string().required("*Required"),
//     password: Yup.string().min(6, "Password must be at least 6 characters").required("*Required"),
//     confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("*Required"),
//   });

//   const initialValues = {
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//     confirmPassword: "",
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: validationSchema,
//     onSubmit: (values, { setFieldError, resetForm }) => {
//       const { confirmPassword, ...formData } = values; // Exclude confirmPassword from formData
  
//       if (values.password !== values.confirmPassword) {
//         setFieldError("confirmPassword", "Passwords must match");
//         return;
//       }
  
//       axios.post("http://localhost:8080/api/v1/auth/register", formData)
//         .then((response) => {
//           if (response.data.success) {
//             console.log("Registration successful!");
//             // Handle success logic here
//             Swal.fire({
//               icon: "success",
//               title: "Registration Successful!",
//               text: "You can now check your email for verification.",
//             });
//             resetForm();
//           } else {
//             console.log("Registration failed:", response.data.message);
//             setFieldError("email", response.data.message);
//           }
//         })
//         .catch((error) => {
//           console.error("Registration error:", error);
//           setFieldError("email", "An error occurred. Please try again later.");
//         });
//     },
//   });
  


//   const login = () => navigate("/login");

//   return (
//     <div className="main">
//       <div className="sub-main" >
//           <div className='image'>
//           <img src='pict_logo.png' alt='Your Image' />
//           </div>
        

       
//         <div className="">
//             <form onSubmit={formik.handleSubmit}>
//               <div className='text-loginn'>Sign Up</div>
//               <div className="signup-main">
//               <div className="row-name">
//                 <label htmlFor="name" className="input-label">
//                   Name <sup className='star'>*</sup>
//                 </label>
//                 <input type="text" autoComplete="off" placeholder="Name" {...formik.getFieldProps("name")} />
                
//               </div>
//               {formik.touched.name && formik.errors.name && <p className="form-error">{formik.errors.name}</p>}
//               <div className="row-name">
//                 <label htmlFor="email" className="input-label">
//                   Email <sup className='star'>*</sup> 
//                 </label>
//                 <input type="email" placeholder="E-mail" autoComplete="off" {...formik.getFieldProps("email")} />
                
//               </div>
//               {formik.touched.email && formik.errors.email && <p className="form-error">{formik.errors.email}</p>}
//               <div className="row-name">
//                 <label htmlFor="address" className="input-label">
//                   Address <sup className='star'>*</sup>
//                 </label>
//                 <input type="text" placeholder="Address" autoComplete="off" {...formik.getFieldProps("address")} />
                
//               </div> 
//               {formik.touched.address && formik.errors.address && <p className="form-error">{formik.errors.address}</p>}
//               <div className="row-name">
//                 <label htmlFor="phone" className="input-label">
//                   Phone <sup className='star'>*</sup>
//                 </label>
//                 <input type="tel"  placeholder="Mobile Number" autoComplete="off" {...formik.getFieldProps("phone")} />
                
//               </div>
//               {formik.touched.phone && formik.errors.phone && <p className="form-error">{formik.errors.phone}</p>}
//               <div className="row-name">
//                 <label htmlFor="password" className="input-label">
//                    Password <sup className='star'>*</sup>
//                 </label>
//                 <input type="password" placeholder="Password" autoComplete="off" {...formik.getFieldProps("password")} />
               
//               </div>
//               {formik.touched.password && formik.errors.password && <p className="form-error">{formik.errors.password}</p>}
//               <div className="row-name">
//           <label htmlFor="confirmPassword" className="input-label">
//              Confirm Password <sup className='star'>*</sup>
//           </label>
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             autoComplete="off"
//             {...formik.getFieldProps("confirmPassword")}
//           />
          
//         </div>
//         {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//             <p className="form-error">{formik.errors.confirmPassword}</p>
//           )}

//                   <div className="sign-up-button-main" >
//                     <button className="sign-up-button" type="submit">
//                       Sign Up
//                     </button>
                  
//                     <div className="login-text">
//                       Already have an account? <button className="login-buttonn" onClick={login}>Login now</button>
//                     </div>
//                   </div>
//               </div>
//             </form>
//             </div>
//             </div>
//     </div>
//   );
// };

// export default Register;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './register.css';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const navigate = useNavigate();

//   const isValidEmail = (email) => {
//     return /\S+@\S+\.\S+/.test(email);
//   };

//   const isValidPhoneNumber = (phone) => {
//     return /^\d{10}$/.test(phone); 
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!name || !email || !phone || !address || !password ) {
//       setError('All fields are required');
//       return;
//     }

//     if (!isValidEmail(email)) {
//       setError('Invalid email address');
//       return;
//     }

//     if (!isValidPhoneNumber(phone)) {
//       setError('Invalid phone number');
//       return;
//     }

//     const formData = {
//       name,
//       email,
//       phone,
//       address,
//       password,
//     };

    
//     axios.post("http://localhost:8080/api/v1/auth/register", formData)
//       .then((response) => {
//         if (response.data.success) {
//           console.log("status code: ", response.status);
//           setError('');
//           setSuccessMessage('Registration successful! You can now check your email for verification.');
//           setName('');
//           setEmail('');
//           setPhone('');
//           setAddress('');
//           setPassword('');
//         } else {
//           console.log("status code: ", response.status);
//           setError(response.data.message);
//           setSuccessMessage('');
//         }
//       })
//       .catch((error) => {
//         if (error.response && error.response.data && error.response.data.message) {
//           setError(error.response.data.message);
//         } else {
//           setError('An error occurred. Please try again later.');
//         }
//         console.log(error);
//         setSuccessMessage('');
//       });
//   };

//   const login = () => navigate("/login");

//   return (
//     <div className="form-container">
//       <h2>Sign-Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Address:</label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Sign Up</button>
//         <p>
//           Already have an account?{" "}
//           <span onClick={login}>Login</span>
//         </p>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//     </div>
//   );
// };

// export default Register;






// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import './register.css';

// const Register = () => {
//   const navigate = useNavigate();

//   const validationSchema = Yup.object({
//     name: Yup.string().min(2).max(25).required("Please enter your name"),
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     phone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number,must 10 digit').required('Phone number is required'),
//     address: Yup.string().required('Address is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       phone: '',
//       address: '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     validateOnChange: true,
//     validateOnBlur: false,
//     onSubmit: (values) => {
//       axios.post("http://localhost:8080/api/v1/auth/register", values)
//         .then((response) => {
//           if (response.data.success) {
//             console.log("status code: ", response.status);
//             formik.resetForm();
//             // Handle success logic
//           } else {
//             console.log("status code: ", response.status);
//             formik.setFieldError('email', response.data.message);
//           }
//         })
//         .catch((error) => {
//           // Handle error logic
//           if (error.response && error.response.data && error.response.data.message){
//             formik.setFieldError(error.response.data.message);
//           }
//             else {
//               formik.setFieldError('An error occurred. Please try again later.');
//             //         }
//           console.error(error);
//         }
//       });
//     },
//   });

//   return (
//     <div className="form-container">
//       <h2>Sign-Up</h2>
//       <form onSubmit={formik.handleSubmit}>
//         {/* Form fields with Formik */}
//         <div>
//           <label>Name:</label>
//           <input type="text" {...formik.getFieldProps('name')} />
//           {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" {...formik.getFieldProps('email')} />
//           {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input type="tel" {...formik.getFieldProps('phone')} />
//           {formik.touched.phone && formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
//         </div>
//         <div>
//           <label>Address:</label>
//           <input type="text" {...formik.getFieldProps('address')} />
//           {formik.touched.address && formik.errors.address && <p className="error">{formik.errors.address}</p>}
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" {...formik.getFieldProps('password')} />
//           {formik.touched.password && formik.errors.password && <p className="error">{formik.errors.password}</p>}
//         </div>
//         <button type="submit">Sign Up</button>
//         <p>
//           Already have an account?{" "}
//           <span onClick={() => navigate("/login")}>Login</span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;

// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import  { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './register.css';



// const Register = () => {
//   const validationSchema = Yup.object({
//     name: Yup.string().min(2).max(25).required("Please enter your name"),
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     phone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number,must 10 digit').required('Phone number is required'),
//     address: Yup.string().required('Address is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   });

//   const initialValues = {
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//   };

//   const { values, handleBlur, handleChange, handleSubmit, errors, touched,setFieldError } =
//     useFormik({
//       initialValues,
//       validationSchema: validationSchema,
//       validateOnChange: true,
//       validateOnBlur: false,
//       //// By disabling validation onChange and onBlur formik will validate on submit.
//       onSubmit: (values, action) => {
//         console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
       
//                 axios.post("http://localhost:8080/api/v1/auth/register", values)
//                   .then((response) => {
//                     if (response.data.success) {
//                       console.log("status code: ", response.status);
//                       action.resetForm();
//                       // Handle success logic
//                     } else {
//                       console.log("status code: ", response.status);
//                       setFieldError('email', response.data.message);
//                     }
//                   })
//                   .catch((error) => {
//                     // Handle error logic
//                     if (error.response && error.response.data && error.response.data.message){
//                       setFieldError(error.response.data.message);
//                     }
//                       else {
//                         setFieldError('An error occurred. Please try again later.');
//                       //         }
//                     console.error(error);
//                   }
//                 });
              
//         // to get rid of all the values after submitting the form

//         action.resetForm();
//       },
//     });

//   console.log(errors);

//   return (
//     <div>
    
      
//         <div className="container">
//           <div className="modal">
//             <div className="modal-container">
//               <div className="modal-left">
//                 <h1 className="modal-title">Welcome!</h1>
//                 <p className="modal-desc">
//                   To the thapa technical website for programmers.
//                 </p>
//                 <form onSubmit={handleSubmit}>
//                   <div className="input-block">
//                     <label htmlFor="name" className="input-label">
//                       Name
//                     </label>
//                     <input
//                       type="name"
//                       autoComplete="off"
//                       name="name"
//                       id="name"
//                       placeholder="Name"
//                       value={values.name}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {touched.name && errors.name ? (
//                       <p className="form-error">{errors.name}</p>
//                     ) : null}
//                   </div>
//                   <div className="input-block">
//                     <label htmlFor="email" className="input-label">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       autoComplete="off"
//                       name="email"
//                       id="email"
//                       placeholder="Email"
//                       value={values.email}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {errors.email && touched.email ? (
//                       <p className="form-error">{errors.email}</p>
//                     ) : null}
//                   </div>
//                   <div className="input-block">
//                     <label htmlFor="address" className="input-label">
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       autoComplete="off"
//                       name="address"
//                       id="address"
//                       placeholder="Address"
//                       value={values.address}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {errors.address && touched.address ? (
//                       <p className="form-error">{errors.address}</p>
//                     ) : null}
//                   </div>

                 
//                   <div className="input-block">
//                     <label className="input-label">
//                       Phone
//                     </label>
//                     <input
//                       type="tel"
//                       autoComplete="off"
//                       name="phone"
//                       id="phone"
//                       placeholder="Mobile Number"
//                       value={values.phone}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {errors.phone && touched.phone ? (
//                       <p className="form-error">{errors.phone}</p>
//                     ) : null}
//                   </div>
//                   <div className="input-block">
//                     <label htmlFor="password" className="input-label">
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       autoComplete="off"
//                       name="password"
//                       id="password"
//                       placeholder="Password"
//                       value={values.password}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {errors.password && touched.password ? (
//                       <p className="form-error">{errors.password}</p>
//                     ) : null}
//                   </div>
                  
                 
//                   <div className="modal-buttons">
//                     <a href="#" className="">
//                       Want to register using Gmail?
//                     </a>
//                     <button className="input-button" type="submit">
//                       Registration
//                     </button>
//                   </div>
//                 </form>
//                 <p className="sign-up">
//                   Already have an account? <a href="#">Sign In now</a>
//                 </p>
//               </div>
//               <div className="modal-right">
              
//               </div>
//             </div>
//           </div>
//         </div>
     
//     </div>
//   );
// };
// export default Register;


