// TeamMemberCard.js
import React from 'react'
import { Card } from 'react-bootstrap';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaGithub } from "react-icons/fa";
const TeamMemberCard = ({ name,designation, role, image,linkedin,instagram }) => {
    return (
      <div className='Cards'>
          <div className="team-member-card">
          <div className="team-member-title">{designation}</div>
            <Card.Img className="team-member-image" variant="top" src={image} alt={name} />
            <Card.Body>
              <div className="team-member-title">{name}</div>
              <div className='logos'>
                <a href={linkedin} className="social-icon linkedin-icon" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href={instagram} className="social-icon instagram-icon" target="_blank" rel="noopener noreferrer">
                <FaGithub />
                </a>
              </div>
            </Card.Body>
        </div>
      </div>
    );
  };
export default TeamMemberCard;