import React from 'react';
// import LoginComponent from '../../components/LoginComponent';
import LoginRegisterComponent from '../../components/LoginRegisterComponent';

const UserLoginPage: React.FC = () => {

    return (
        <LoginRegisterComponent isAdmin={false} isLogin={true} />
    );
};

export default UserLoginPage;