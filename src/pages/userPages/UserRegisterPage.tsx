import React from 'react';
// import RegisterComponent from '../../components/RegisterComponent';
import LoginRegisterComponent from '../../components/LoginRegisterComponent';

const UserRegisterPage: React.FC = () => {

    return (
        <LoginRegisterComponent isAdmin={false} isLogin={false}/>
    );
};

export default UserRegisterPage;