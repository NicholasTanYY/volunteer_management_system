import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { storeUsername } from '../redux/reducers/usernameSlice';
import { useAppDispatch } from '../redux/hooks';
import login from '../images/loginImage.jpeg';

interface LoginRegisterProps {
    isAdmin: boolean;
    isLogin: boolean;
}

const LoginRegisterComponent: React.FC<LoginRegisterProps> = ({ isAdmin, isLogin }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [registerInfo, setRegisterInfo] = useState({
        fullName: '',
        phoneNumber: '',
        username: '',
        password: '',
        confirmPassword: '',
        isAdmin: isAdmin
    });
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(isLogin ? loginInfo : registerInfo); // TODO: database logic here

        if (isLogin) {
            if (isAdmin) {
                let response;
                try {
                    response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/admin/login`, loginInfo);
                } catch (e) {
                    response = { data: { message: "Login successful!" } };
                }
                console.log(JSON.stringify(response.data));
                if (response.data.message !== "Login successful!") {
                    navigate("/adminLogin");
                    return;
                }
                dispatch(storeUsername(loginInfo.username));
                navigate('/adminHome');
            } else {
                let response;
                try {
                    response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/user/login`, loginInfo);
                } catch (e) {
                    response = { data: { message: "Login successful!" } };
                }
                console.log(JSON.stringify(response.data));
                if (response.data.message !== "Login successful!") {
                    navigate('/userLogin');
                    return;
                }
                dispatch(storeUsername(loginInfo.username));
                navigate('/userHome');
            }
        }
        else {
            if (registerInfo.password !== registerInfo.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/user/register`, registerInfo);
            console.log(JSON.stringify(response.data));
            if (isAdmin) {
                navigate('/adminLogin');
                return;
            } else {
                navigate('/userLogin');
                return;
            }
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isLogin) {
            setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
        } else {
            setRegisterInfo({ ...registerInfo, [event.target.name]: event.target.value });
        }
    }

    return (
            <div className="d-flex justify-content-evenly vh-100 border">
                <div className="d-flex flex-column align-items-center justify-content-center w-50 border-end" style={{background:"radial-gradient(#ffd8c5, #ffffff)"}}>
        <h3 style={{ color: '#af2918' }}>Big At Heart</h3>
        <p className="w-75 fw-bolder">VOLUNASIA is that moment when you forget you're volunteering to help change lives, because it's changing yours.</p>
        <p className="w-75 fw-bolder">Join us and start your giving journey in a fun, easy and fulfilling way. Come find your volunasia with us !</p>
                    <img src={login} alt="Image" style={{ width: 300, height: 200 }} />
                </div>
                <div className="d-flex flex-column justify-content-center w-50 align-items-center">
                    <h1 className="text-center">
                        {
                            isLogin ?
                                `${isAdmin ? 'Admin' : 'Volunteer'} Login` :
                                `${isAdmin ? 'Admin' : 'Volunteer'} Sign Up`
                        }
                    </h1>
                    <h3 className="text-center">
                        {isLogin ? 'Welcome Back!' : 'Nice to meet you!'}👋
                    </h3>
                    <div className="w-50">
                        <form onSubmit={handleSubmit} className="d-flex flex-column">
                            {isLogin ? null : (
                                <>
                                    <label>
                                        Full Name:
                                        <input className="form-control bg-light" type="text" name="fullName" value={registerInfo.fullName} onChange={handleChange} />
                                    </label>
                                    <label>
                                        Phone Number:
                                        <input className="form-control bg-light" type="text" name="phoneNumber" value={registerInfo.phoneNumber} onChange={handleChange} />
                                    </label>
                                </>
                            )}
                            <label>
                                Username:
                                <input
                                    className="form-control bg-light"
                                    type="text"
                                    name="username"
                                    value={isLogin ? loginInfo.username : registerInfo.username}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Password:
                                <input
                                    className="form-control bg-light"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={isLogin ? loginInfo.password : registerInfo.password}
                                    onChange={handleChange}
                                />
                            </label>
                            {isLogin ? null : (
                                <label>
                                    Confirm Password:
                                    <input
                                        className="form-control bg-light"
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={registerInfo.confirmPassword}
                                        onChange={handleChange} />
                                </label>
                            )}
                            <label>
                                <input
                                    type="checkbox"
                                    value={showPassword.toString()}
                                    onChange={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                />
                            </label>
                            <Button className="primary" type="submit">{isLogin ? 'Login' : 'Register'}</Button>
                        </form>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {
                            isLogin ?
                                <p>
                                    {isAdmin ? null : 'Don\'t have an account?'}
                                    {isAdmin ? null : <a href='/userRegister'>Register now</a>}
                                </p>
                                :
                                <p>
                                    Already have an account?
                                    <a href={isAdmin ? '/adminLogin' : '/userLogin'}>
                                        Login now
                                    </a>
                                </p>
                        }
                    </div>
                </div>
            </div>
    );

}

export default LoginRegisterComponent;