// TeamSection.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeamMemberCard from './TeamMemberCard';
import "../styles/TeamSection.css"

const teamMentor = [
  { name: 'Rachna Karnavat', role: 'Teacher', image: 'rachna mam-modified.png', linkedin: 'https://www.linkedin.com/in/rachna-c-631a0916/',
      instagram: '', },
  { name: 'Dr. Shweta Dharmadhikari', role: 'Teacher', image: 'Swwetw_ photo-modified.png', linkedin: 'https://www.linkedin.com/in/shwetacd/',
      instagram: '', },
 
];
const teamMembers = [
  { name: 'Vijay Kumar', role: 'Frontend Developer', image: 'vijay2-modified.png', linkedin: 'https://www.linkedin.com/in/vijay-kumar-437b51230/',
      instagram: 'https://github.com/vijaykumar2892002', },
  { name: 'Sahil Jagadale', role: 'Backend Developer', image: 'sahil_photo-modified.png', linkedin: 'https://www.linkedin.com/in/sahil-jagadale-b8b447258/',
      instagram: 'https://github.com/Sahil-Jagadale', },
  { name: 'Rushikesh Dhaygude', role: 'Backend Developer', image: 'rushi_photo-modified.png', linkedin: 'https://www.linkedin.com/in/rushikesh-dhaygude-a3a0b71a8/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      instagram: 'https://github.com/RushikeshDhaygude', },
  { name: 'Kavita Thete', role: 'Backend Developer', image: 'kavita_photo-modified.png', linkedin: 'https://www.linkedin.com/in/kavitathete',
      instagram: 'https://github.com/Kavitat17', },
  { name: 'Shankar Pawar', role: 'Backend Developer', image: 'shankar_photo-modified.png' ,linkedin: 'https://www.linkedin.com/in/shankar-pawar-281b01212/',
      instagram: 'GitHub- https://github.com/spawar955 ', },
  
  
  
];

const TeamSection = () => {
  return (
    
    <> <div className="our-team"  sm={12} md={4}><h1>Our Team</h1></div>
    <div className='team-section'>
    <div className='row1'>
    <Container > 
      <Row className='d-flex justify-content-center'>
        {teamMentor.map((member, index) => (
          <Col key={index} sm={12} md={4} lg={4}>
            <TeamMemberCard 
              name={member.name}
              role={member.role}
              image={member.image}
              linkedin={member.linkedin}
              instagram={member.instagram}
            />
          </Col>
        ))}
      </Row>
      </Container>
      </div>
    
      <div className='row1'>
    <Container >
      <Row className='d-flex justify-content-center'>
        {teamMembers.map((member, index) => (
          <Col key={index} sm={12} md={4} lg={4}>
            <TeamMemberCard
              name={member.name}
              role={member.role}
              image={member.image}
              linkedin={member.linkedin}
              instagram={member.instagram}
            />
          </Col>
        ))}
      </Row>
    </Container>
    </div>
    </div>
    </>
  );
};

export default TeamSection;
