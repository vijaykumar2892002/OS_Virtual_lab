import React from 'react';
 import {  NavLink } from 'react-router-dom';
 const Navbar = () => {
  return (
    <>
     <nav className="main-nav fixed-top">
        <div className="logo">
            <h2>os_lab</h2>
        </div>
        <div className="nav-link">
            <ul >
                <li>
                    <NavLink className='a' to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink className='a' to="/home2">About</NavLink>
                </li>
                <li>
                    <NavLink className='a' to="/home3">Contact</NavLink>
                </li>
                
                
            </ul>
        </div>
     </nav>
     

     
    </>
  )
}

export default Navbar
