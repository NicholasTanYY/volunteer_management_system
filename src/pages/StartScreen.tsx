import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'

const StartScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome! Please select your role:</h1>
      <button onClick={() => navigate('/user')}>User</button>
      <button onClick={() => navigate('/admin')}>Admin</button>
    </div>
  );
};

export default StartScreen;
