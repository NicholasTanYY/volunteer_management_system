import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import login from '../images/loginImage.jpeg';

const StartScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="vh-100 d-flex flex-row justify-content-evenly">
      <div className="d-flex flex-column justify-content-center align-items-center w-50" style={{background:"radial-gradient(#ffd8c5, #ffffff)"}}>
        <h3 style={{ color: '#af2918' }}>Big At Heart</h3>
        <p className="w-75 fw-bolder">VOLUNASIA is that moment when you forget you're volunteering to help change lives, because it's changing yours.</p>
        <p className="w-75 fw-bolder">Join us and start your giving journey in a fun, easy and fulfilling way. Come find your volunasia with us !</p>
        <img src={login} alt="Image" style={{ width: 300, height: 200 }} />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center border-start w-50">
        <h1>I am a...</h1>
        <Button variant="bg-light border border-dark" className="m-2" onClick={() => navigate('/userLogin')}>Volunteer</Button>
        <Button variant="bg-light border border-dark" className="m-2" onClick={() => navigate('/adminLogin')}>Admin</Button>
      </div>
    </div>
  );
};

export default StartScreen;
