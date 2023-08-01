import React from "react";
import { Link, Redirect } from "react-router-dom";
// import Typewriter from "typewriter-effect";

import lensImg from "../assets/Images/lensImage.png";
import topbarLogo from "../assets/Images/brandLogo2.svg";
import invstoLogo from "../assets/Images/invstoLogo.svg";

import "./LandingPage.css";

function LandingPage() {
  return (
    <div style={{ height: "100vh" }} className="landingPage">
      <header className="landingPage__header">
        <nav>
          <div className="landingPage__header--logo">
            <img src={topbarLogo} alt="" />
          </div>

          {document.cookie !== "" ? <Redirect to="/marketOverview" /> : null}

          <Link to="/login" alt="" className="landingPage__header--btn">
            Sign In
          </Link>
        </nav>
      </header>

      <section className="landingPage__main">
        <main
          style={{
            backgroundImage: `url(${lensImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto",
            backgroundPosition: "center center",
            backgroundPositionY: "-5rem",
            height: "65vh",
          }}
        >
          <h3>FOR INDIVIDUALS AND ASSET MANAGERS WITHOUT IT TEAMS</h3>
          <h1 style={{ fontSize: "3rem", margin: "1rem 0" }}>
            Unified Trading Interface to Scale Your Capital
          </h1>
          <h2>
            Build strategies, deploy them, launch subscriptions. Cancel anytime.
          </h2>
          <Link to="/login" alt="" className="landingPage__main--btn">
            Get Started
          </Link>
        </main>
      </section>

      <footer className="landingPage__footer">
        <div>
          <ul>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Support</li>
            <li>Tutorials</li>
            <li>
              <a href="https://www.invsto.com/">Visit Invsto</a>
            </li>
          </ul>

          <p>
            Shark Sigma is the intellectual property of Invsto. 2023 Invsto (c).
            All rights reserved.
          </p>
        </div>

        <div>
          <img src={invstoLogo} alt="Invsto Logo" />
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
