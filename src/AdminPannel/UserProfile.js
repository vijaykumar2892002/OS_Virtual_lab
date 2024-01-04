import React from 'react';
import "./userProfile.css";

const UserProfile = ({ user }) /*passing prop named user */ =>{
    return(
        <div className="user-profile">
            <h2>User Profile</h2>
            {user && ( //conditional rendering checks if user prop is undefined
                <div>
                    <p><strong>Name:</strong> {user.name} </p>
                    <p><strong>Email:</strong> {user.email} </p>
                    <p><strong>Phone:</strong> {user.phone} </p>
                    <p><strong>Address:</strong> {user.adddress} </p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;