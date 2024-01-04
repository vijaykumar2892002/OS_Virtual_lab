import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import './ApproveUser.css';

const ApproveUser = () => {
  const [approvalStatus, setApprovalStatus] = useState('');
  const { token } = useParams();

  const handleApprove = () => {
    // Ensure that the token is defined
    if (!token) {
      console.error('Token is undefined');
      return;
    }

    axios.get(`https://osl-backend.onrender.com/api/v1/auth/approve/${token}`)
      .then((response) => {
        if (response.data.success) {
          setApprovalStatus('User approved successfully.');
          Swal.fire({
            icon: "success",
            title: "Approved Successful!",
          });
        } else {
          setApprovalStatus(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error approving user:', error);
        setApprovalStatus('An error occurred while approving the user.');
      });
  };

  return (
    <div className='user-approval'>
      <div className='user-app'>
        <div>
          <h2>User Approval</h2>
          <p>{approvalStatus}</p>
          <button className='button-approve' onClick={handleApprove}>Approve User</button>
        </div>
      </div>
    </div>
  );
};

export default ApproveUser;