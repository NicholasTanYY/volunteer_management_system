import React from 'react';
import LoginComponent from '../../components/LoginComponent';

const UserLoginPage: React.FC = () => {

    return (
        <LoginComponent isAdmin={true} />
    );
};

export default UserLoginPage;