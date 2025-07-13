import { useState, useEffect } from 'react';
import React from 'react';
import './Login2.css';
import logo from '../Assets/imagesLogin/logo.png'
import { useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export const handleSignInClick = () => {
    window.location.href = '#';
}

export const Login = () => {
    const [datos, setDatos] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (datos) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/clients/email/${datos[1]}`);
                    if (response.ok) {
                        const user = await response.json();
                        sessionStorage.setItem('datosloginId', user._id);
                        sessionStorage.setItem('datosloginRole',"Admin");
                        sessionStorage.setItem('datoslogindescription', user.description);
                        sessionStorage.setItem('datosloginavatar', user.avatar);
                        sessionStorage.setItem('datosloginNombre', user.name);
                        sessionStorage.setItem('datosloginCorreo', user.email);
                        navigate('/home'); // Redirige a /home
                    } else {
                        // User not found, create a new user
                        const newUser = {
                            name: datos[0],
                            email:datos[1],
                            role: 'User',
                            description: '',
                            avatar: '',
                            friends: []
                        };
                        console.log(newUser.email)
                        const createResponse = await fetch('http://localhost:8000/clients/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newUser)
                        });

                        const createdUser = await createResponse.json();
                        console.log('User created:', createdUser);
                        sessionStorage.setItem('datosloginId', createdUser._id);
                        sessionStorage.setItem('datosloginRole', 'Admin');
                        sessionStorage.setItem('datoslogindescription', createdUser.description);
                        sessionStorage.setItem('datosloginavatar', createdUser.avatar);
                        sessionStorage.setItem('datosloginNombre', datos[0]);
                        sessionStorage.setItem('datosloginCorreo', datos[1]);
                        navigate('/home'); // Redirige a /home
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchUser();
        }
    }, [datos, navigate]);

    return (
        <div className='container-login'>
            <div className="caja-login-2">
                <div className="welcome">
                    <p>Welcome</p>
                </div>
                <div className="logo-login">
                    <img src={logo} alt="" />
                </div>

                <div className="email-password">
                    <div className="sign-in-container" onClick={handleSignInClick}>
                        <GoogleOAuthProvider clientId="69442523544-o84i2unoeo9fbpc9h1moeqqa89hedv7a.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    const decoded = jwtDecode(credentialResponse?.credential);
                                    setDatos([decoded.name, decoded.email]);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                useOneTap
                            />
                        </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;