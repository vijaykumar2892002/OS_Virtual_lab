import React, { useState } from "react";
import { useNavigate , Routes,Route} from "react-router-dom";
import UserProfile from "./UserProfile";
import "./adminPanel.css";
import ContentForm from "./ContentForm";
import Content from "../components/Content";
const AdminPanel = () => {
    
    const navigate = useNavigate(); // hook for navigation
    const user = JSON.parse(localStorage.getItem('user')); //retriving user details from local storage
    console.log("User:", user);

    
   
  const handleAddContentClick = () => {
    navigate("/AdminPanel/user-profile/add-content");
  };

  const handleViewContentClick = () => {
    navigate("/AdminPanel/user-profile/view-content");
  };

    return(
        <div className="admin-main">
            <h2 className="admin-panel">Admin Panel</h2>
           <div className="section">
           <div > <img className="profil-img" src={process.env.PUBLIC_URL + '/image/pict_logo.png'}alt="" /></div>
           <div><UserProfile user={user} />
           <div className="button-main">
                <div >
                    <button onClick={handleAddContentClick} className="add-content">Add Content</button>
                </div>
                <div>
                    <button  onClick={handleViewContentClick}className="add-content">View Content</button>
                </div>
            </div>
           </div>
           </div>
            
            {/* Pass user details as a prop */}
            {/* <button onClick={handleNavigateToUserProfile}>User Profile</button> */}

            <Routes>
                <Route path='/AdminPanel/user-profile' element={<UserProfile user={user} />} />
            </Routes>
           
        </div>
    );

};
export default AdminPanel;