import React from 'react';

const Login = (props) => {
    const { email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError } = props;
    return (
        <section className="login">
            <div className="loginContainer">
                <label> Username </label>
                <input type="text" autoFocus required value={email} onChange ={(e) => setEmail(e.target.value)} />
                <p className="errMsg"> {emailError} </p>
                <label> Password </label>
                <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
        </section >

    )
};

export default Login;