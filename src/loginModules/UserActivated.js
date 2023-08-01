import React from 'react';
import "../App.css";
import './UserActivated.css';
// import '../../../../App.css';

function UserActivated() {
    return (
        <div className="d-flex justify-content-center align-items-center main-signup-container">
            <div className="d-flex flex-column align-items-center">
                <div className="mt-4"><img width="300" src="brandImage.PNG" alt="" /></div>
                <div className="text-main signup-content d-flex flex-column align-items-center p-5">
                    <div className="center my-3">Congratulations !</div>
                    <div className="my-3 text-center mb-5">Dear User, you have successfully activated your profile, you can now process to Login</div>
                    <div className="my-3 mt-5"><a href="/login" className="shark-signup-btn rounded">SHARK SIGMA</a></div>
                </div>
            </div>
        </div>
    )
}

export default UserActivated
