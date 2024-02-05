import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

interface LoginProps {
    isAdmin: boolean;
}

const LoginComponent: React.FC<LoginProps> = ({ isAdmin }) => {
    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(loginInfo); // TODO: database logic here
        if (isAdmin) {
            navigate('/adminHome');
        } else {
            navigate('/userHome');
        }
        setLoginInfo({ username: '', password: '' });
    }

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    }

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{isAdmin ? 'Admin' : 'Volunteer'} Login</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h3>Welcome Back!</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label>
                        Username:
                        <input type="text" name="username" value={loginInfo.username} onChange={handleLoginChange} />
                    </label>
                    <label>
                        Password:
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            value={loginInfo.password} 
                            onChange={handleLoginChange} 
                        />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value={showPassword.toString()}
                            onChange={() =>
                                setShowPassword((prev) => !prev)
                            }
                        />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>Don't have an account? <a href={isAdmin ? '/adminRegister' : '/userRegister'}>Sign up now</a></p>
            </div>
        </Container>
    );

};

export default LoginComponent;