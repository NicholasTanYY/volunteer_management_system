import React from 'react';
import RegisterComponent from '../../components/RegisterComponent';

const UserRegisterPage: React.FC = () => {

    return (
        <RegisterComponent isAdmin={false} />
    );
};

export default UserRegisterPage;