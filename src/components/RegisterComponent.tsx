import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

interface RegisterProps {
    isAdmin: boolean;
}

const RegisterComponent: React.FC<RegisterProps> = ({ isAdmin }) => {
    const navigate = useNavigate();

    const [registerInfo, setRegisterInfo] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(registerInfo); // TODO: database logic here
        if (isAdmin) {
            navigate('/adminLogin');
        } else {
            navigate('/userLogin');
        }
        setRegisterInfo({ username: '', password: '', confirmPassword: '' });
    }

    const handleRegisterChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterInfo({ ...registerInfo, [event.target.name]: event.target.value });
    }

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{isAdmin ? 'Admin' : 'Volunteer'} Sign Up</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h3>Nice to meet you!</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>

                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label>
                        Username:
                        <input type="text" name="username" value={registerInfo.username} onChange={handleRegisterChange} />
                    </label>
                    <label>
                        Password:
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            value={registerInfo.password} 
                            onChange={handleRegisterChange} 
                        />
                    </label>
                    <label>
                        Confirm Password:
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="confirmPassword" 
                            value={registerInfo.confirmPassword} 
                            onChange={handleRegisterChange} />
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
                    <button type="submit">Register</button>
                </form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>Already have an account? <a href={isAdmin ? '/adminLogin' : '/userLogin'}>Login now</a></p>
            </div>
        </Container>
    );

}

export default RegisterComponent;