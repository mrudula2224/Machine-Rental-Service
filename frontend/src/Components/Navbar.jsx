import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <style>
        {`
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 40px;
            background: linear-gradient(90deg, #0f172a, #1e293b);
            color: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          }

          .logo {
            font-size: 22px;
            font-weight: bold;
            letter-spacing: 1px;
            color: #38bdf8;
          }

          .nav-links {
            display: flex;
            align-items: center;
            gap: 18px;
          }

          .nav-links a {
            text-decoration: none;
            color: #e2e8f0;
            font-size: 15px;
            padding: 6px 10px;
            border-radius: 6px;
            transition: 0.3s;
          }

          .nav-links a:hover {
            background: #334155;
            color: #38bdf8;
          }

          .welcome {
            font-size: 14px;
            color: #cbd5f5;
          }

          .logout-btn {
            padding: 6px 12px;
            border: none;
            border-radius: 6px;
            background: #ef4444;
            color: white;
            cursor: pointer;
            transition: 0.3s;
          }

          .logout-btn:hover {
            background: #dc2626;
          }

          .auth-btn {
            background: #38bdf8;
            padding: 6px 12px;
            border-radius: 6px;
            color: black;
            font-weight: 500;
          }

          .auth-btn:hover {
            background: #0ea5e9;
            color: white;
          }

          @media (max-width: 768px) {
            .navbar {
              flex-direction: column;
              gap: 10px;
              padding: 15px;
            }
          }
        `}
      </style>

      <nav className="navbar">
        <div className="logo">⚙️ Machine Rental</div>

        <div className="nav-links">
          {/* Common */}
          <Link to="/">Home</Link>
          <Link to="/machines">Machines</Link>

          {/* RENTER */}
          {user?.role === 'renter' && (
              <Link to="/my-bookings">My Bookings</Link>

          )}

          {/* OWNER */}
          {user?.role === 'owner' && (
            <>
              <Link to="/owner/dashboard">Dashboard</Link>
              <Link to="/owner/bookings" > Bookings</Link>
              
            </>
          )}

          {/* ADMIN */}
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard">Admin Panel</Link>
          )}

          {/* AUTH */}
          {!user ? (
            <>
              <Link to="/login" className="auth-btn">Login</Link>
              <Link to="/signup" className="auth-btn">Signup</Link>
            </>
          ) : (
            <>
              <span className="welcome">
                👋 {user.name || user.username}
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;