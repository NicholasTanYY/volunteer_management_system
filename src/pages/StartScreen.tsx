import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'

const StartScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome! Please select your role:</h1>
      <Button variant="primary" onClick={() => navigate('/userHome')}>User</Button>
      <Button variant="primary" onClick={() => navigate('/adminHome')}>Admin</Button>
    </div>
  );
};

export default StartScreen;