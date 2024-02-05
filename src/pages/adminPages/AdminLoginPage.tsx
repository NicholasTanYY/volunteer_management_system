import React from 'react';
// import LoginComponent from '../../components/LoginComponent';
import LoginRegisterComponent from '../../components/LoginRegisterComponent';

const AdminLoginPage: React.FC = () => {

    return (
        <LoginRegisterComponent isAdmin={true} isLogin={true} />
    );
};

export default AdminLoginPage;