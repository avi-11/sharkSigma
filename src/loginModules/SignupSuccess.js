import React from 'react'
// import { Link, Route } from 'react-router-dom'
import "../App.css";
import './SignupSuccess.css';

function SignupSuccess() {
    return (

        <div className="d-flex justify-content-center align-items-center main-activated-container">

            <div className="d-flex flex-column align-items-center">
                <div className="text-main-activated activated-content d-flex flex-column p-5">
                    <div className="center-activated text-center mb-5">Email Verification</div>
                    <div className="line"></div>
                    <div className="my-3 mb-3">We have sent you an email to the registered email, If you have not received it, please check your Spam folder. If you did not receive the verification email, please click on Resend Verification Email.</div>
                    <div className="my-3 mt-3"><a href="/" className="shark-activated-btn rounded">Got it !</a></div>
                    <div className="my-3 mt-3"><a href="/" className="btn p-0 text-light">Resend Verification Email</a></div>
                </div>
            </div>

        </div>

    )
}

export default SignupSuccess

