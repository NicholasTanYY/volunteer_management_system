import Button from '@mui/material/Button';
import React, { ReactNode, ReactElement, MouseEvent } from 'react';

interface CertButtonProps {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    buttonType: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

const CertButton: React.FC<CertButtonProps> = ({ startIcon, endIcon, buttonType, onClick, children }) => {
    const buttonStyle0 = {  // Download certificate
        color: '#0000FF',
        borderColor: '#0000FF',
    };
    const buttonStyle1 = {  // Pending approval
        color: '#444444',
        borderColor: '#444444',
    };
    const buttonStyle2 = { // Request for certificate
        color: '#A52A2A',
        borderColor: '#A52A2A',
    };
    const buttonStyle3 = { // Request for certificate disabled
        color: '#555555',
        borderColor: '#999999',
        backgroundColor: '#999999',
    };

    const buttonStyle = buttonType === "Download" ? buttonStyle0 : buttonType === "Pending" ? buttonStyle1 : buttonType === "Request" ? buttonStyle2 : buttonStyle3;

    return (
        <Button style={buttonStyle} variant="outlined" startIcon={startIcon} endIcon={endIcon} onClick={onClick} disabled={buttonType === "Disabled"}>
            {children}
        </Button>
    );
};

export default CertButton;