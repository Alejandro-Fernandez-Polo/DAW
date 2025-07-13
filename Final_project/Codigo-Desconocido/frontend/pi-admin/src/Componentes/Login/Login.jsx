import React from 'react';
import './Login.css';
import logoGoogle from '../Assets/imagesLogin/logo-google.png'
import logo from '../Assets/imagesLogin/logo.png'

export const handleSignInClick = () => {
    window.location.href = '#';
}

export const Login = () => {

    return (
        <div className='container-login'>
            <div className="caja-login">
                <div className="welcome">
                    <p>Welcome</p>
                </div>
                <div className="logo-login">
                    <img src={logo} alt="" />
                </div>

                <div className="email-password">
                    <form action="">
                        <input type="email" id="email" name="email" placeholder="Username" required/>
                        {/* <input type="email" id="email" name="email" placeholder="Password" required/> */}
                    </form>
                    <div className="sign-in-container" onClick={handleSignInClick}>
                        <img src={logoGoogle} alt="" />
                        <h3>Sing in with Google</h3>
                    </div>
                    <form action="">
                        <input id = "btn" type="submit" value="LOGIN"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login