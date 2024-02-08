import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const StartScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="vh-100 d-flex flex-row justify-content-evenly">
      <div className="d-flex flex-column justify-content-center">
        <h1>Image</h1>
      </div>
      <div className="d-flex flex-column justify-content-center">
        <h1>I am a...</h1>
        <Button variant="dark" className="m-2" onClick={() => navigate('/userLogin')}>Volunteer</Button>
        <Button variant="dark" className="m-2" onClick={() => navigate('/adminLogin')}>Admin</Button>
      </div>
    </div>
  );
};

export default StartScreen;
