import React from 'react';
import { BiSolidHide, BiShow } from 'react-icons/bi';

const PasswordToggle = ({ showpassword, setshowpassword }) => {
  return (
    <span
      className="password-icon"
      onClick={() => setshowpassword((prev) => !prev)}
    >
      {showpassword ? (
        <BiShow fontSize={24} fill="#AFB2BF" />
      ) : (
        <BiSolidHide fontSize={24} fill="#AFB2BF" />
      )}
    </span>
  );
};

export default PasswordToggle;
