import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import bgImage from "../assets/image1.jpg";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: Arial, sans-serif;
          }

          .hero {
            height: 90vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
          }

          .hero h1 {
            font-size: 48px;
            margin-bottom: 10px;
          }

          .hero p {
            font-size: 18px;
            margin-bottom: 20px;
            color: #e2e8f0;
          }

          .buttons button {
            margin: 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
          }

          .explore {
            background: #38bdf8;
            color: black;
            transition : 0.3s;
          }

          .explore:hover{
          background-color: black;
          color:white;
          cursor: pointer;
          }

          .login {
            background: #22c55e;
            color: white;
          }

          .section {
            padding: 50px 20px;
            text-align: center;
          }

          .features {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
          }

          .card {
            background: #1e293b;
            color: white;
            padding: 20px;
            border-radius: 10px;
            width: 250px;

              transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card:hover {
            transform: translateY(-10px) scale(1.05);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            cursor: pointer;
            }

          .about {
            background: #0f172a;
            color: #e2e8f0;
          }

          h2 {
            color: #38bdf8;
          }


        `}
      </style>

      {/* 🔥 HERO SECTION */}
      <div className="hero"
      style={{
       backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${bgImage})`,
       backgroundSize: "cover",
       backgroundPosition: "center"
      }}
      >
        <h1>Machine Rental Service</h1>
        <p>Rent Machines Easily • Earn by Listing • Manage Smartly</p>

        <div className="buttons">
          <button className="explore" onClick={() => navigate("/machines")}>
            Explore Machines
          </button>

        </div>
      </div>

      {/* 🔥 FEATURES */}
      <div className="section">
        <h2>Why Choose Us?</h2>

        <div className="features">
          <div className="card">
            <h3>🚜 Easy Rentals</h3>
            <p>Browse and book machines with just a few clicks.</p>
          </div>

          <div className="card">
            <h3>💼 Earn Money</h3>
            <p>Owners can list machines and earn from rentals.</p>
          </div>

          <div className="card">
            <h3>🔐 Secure System</h3>
            <p>Role-based authentication keeps everything safe.</p>
          </div>

          <div className="card">
            <h3>⚡ Fast Booking</h3>
            <p>Instant booking requests with approval system.</p>
          </div>
        </div>
      </div>

      {/* 🔥 ABOUT */}
      {/* <div className="section about">
        <h2>About This Project</h2>
        <p style={{ maxWidth: "700px", margin: "auto" }}>
          Machine Rental Service is a web-based platform where users can rent
          machines for short-term use. Owners can list their machines, renters
          can book them, and the system ensures smooth communication and booking
          management. Built using MERN stack with JWT authentication and
          role-based access control.
        </p>
      </div> */}
    </>
  );
};

export default Home;