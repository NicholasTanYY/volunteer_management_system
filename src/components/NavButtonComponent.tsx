import Button from '@mui/material/Button';
import React, { ReactNode, ReactElement, MouseEvent } from 'react';

interface NavButtonProps {
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ startIcon, endIcon, onClick, children }) => {
  const buttonStyle = {
    backgroundColor: '#f0f0f0',
    color: '#333',
  };

  return (
    <Button style={buttonStyle} variant="outlined" startIcon={startIcon} endIcon={endIcon} onClick={onClick}>
      {children}
    </Button>
  );
};

export default NavButton;